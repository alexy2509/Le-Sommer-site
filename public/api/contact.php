<?php
/*
  Traitement du formulaire de devis — LE SOMMER.
  Endpoint : POST /api/contact.php   →   envoie la demande à v.lesommer@outlook.fr

  Défenses mises en place (cahier des charges §12.3 / §12.4) :
    - CSRF        : jeton lié à la session, comparé en temps constant (hash_equals)
    - XSS         : aucune donnée utilisateur n'est jamais réaffichée en HTML ; la réponse
                    est un JSON minimal, et le mail est en texte brut
    - Injection d'en-têtes mail : tout \r ou \n dans un champ court entraîne un rejet
    - Clickjacking : X-Frame-Options + CSP frame-ancestors (dans .htaccess, pour TOUT le site)
    - Robots      : champ piège (honeypot) + délai minimal de remplissage
    - Abus        : 5 envois maximum par IP et par heure (compteur fichier verrouillé)
    - Débordement : chaque champ est borné, le corps de requête est plafonné

  Aucune bibliothèque externe : moins de surface d'attaque, rien à maintenir à jour.
*/

declare(strict_types=1);

// ---------------------------------------------------------------- configuration
const DESTINATAIRE = 'v.lesommer@outlook.fr';
const SUJETS = ['Électricité industrielle', "Matériel d'élevage", 'Ventilation', 'FAF & stockage', 'Dépannage', 'Recrutement', 'Autre'];
const MAX = ['name' => 80, 'company' => 80, 'email' => 120, 'phone' => 20, 'message' => 3000];
const DELAI_MINIMAL = 3;      // secondes : en dessous, c'est un robot
const QUOTA_PAR_HEURE = 5;

// Session : cookie inaccessible au JavaScript, jamais transmis hors du site, HTTPS seulement.
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'secure' => !empty($_SERVER['HTTPS']),
    'httponly' => true,
    'samesite' => 'Strict',
]);
session_start();

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

/** Réponse volontairement identique en cas de rejet : on ne renseigne pas un robot. */
function repondre(bool $ok, int $code = 200): never
{
    http_response_code($code);
    echo json_encode(['ok' => $ok], JSON_UNESCAPED_UNICODE);
    exit;
}

// ---------------------------------------------------------------- jeton CSRF
// GET renvoie un jeton : le formulaire le demande au chargement de la page.
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'GET') {
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    // Instant d'ouverture du formulaire : sert à mesurer le délai de remplissage.
    $_SESSION['form_time'] = time();
    echo json_encode(['token' => $_SESSION['csrf']], JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: GET, POST');
    repondre(false, 405);
}

// Corps trop volumineux : on refuse avant toute lecture.
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 20000) {
    repondre(false, 413);
}

// Le jeton doit exister en session ET correspondre. hash_equals compare en temps constant.
$jeton = (string) ($_POST['csrf_token'] ?? '');
if (empty($_SESSION['csrf']) || $jeton === '' || !hash_equals($_SESSION['csrf'], $jeton)) {
    repondre(false, 403);
}

// Même origine : une requête montée depuis un autre site est écartée.
$origine = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origine !== '') {
    $hoteOrigine = parse_url($origine, PHP_URL_HOST);
    $hoteSite = $_SERVER['HTTP_HOST'] ?? '';
    if ($hoteOrigine !== null && strcasecmp((string) $hoteOrigine, $hoteSite) !== 0) {
        repondre(false, 403);
    }
}

// ---------------------------------------------------------------- pièges à robots
$champ = static fn(string $c): string => trim((string) ($_POST[$c] ?? ''));

// Champ piège, masqué en CSS : un humain ne le voit pas, un robot le remplit.
if ($champ('website') !== '') {
    repondre(true); // succès simulé : le robot ne sait pas qu'il a été écarté
}

// Formulaire renvoyé trop vite après son affichage.
$depuis = time() - (int) ($_SESSION['form_time'] ?? 0);
if (!empty($_SESSION['form_time']) && $depuis < DELAI_MINIMAL) {
    repondre(true);
}

// ---------------------------------------------------------------- validation stricte
$nom = $champ('name');
$entreprise = $champ('company');
$email = $champ('email');
$telephone = $champ('phone');
$sujet = $champ('subject');
$message = $champ('message');
$consentement = $champ('consent');

/** Un retour à la ligne dans un champ court = tentative d'injection d'en-tête mail. */
$sansSautDeLigne = static fn(string $v): bool => !preg_match('/[\r\n]/', $v);

if ($nom === '' || mb_strlen($nom) > MAX['name'] || !$sansSautDeLigne($nom)) repondre(false, 422);
if (mb_strlen($entreprise) > MAX['company'] || !$sansSautDeLigne($entreprise)) repondre(false, 422);
if (mb_strlen($email) > MAX['email'] || !$sansSautDeLigne($email)) repondre(false, 422);
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) repondre(false, 422);
if (!preg_match('/^[0-9 +().-]{6,20}$/', $telephone)) repondre(false, 422);
if (!in_array($sujet, SUJETS, true)) repondre(false, 422);
if ($message === '' || mb_strlen($message) > MAX['message']) repondre(false, 422);
if ($consentement !== 'on') repondre(false, 422);

// ---------------------------------------------------------------- quota par IP
$ip = (string) ($_SERVER['REMOTE_ADDR'] ?? '');
if ($ip !== '') {
    $fichier = sys_get_temp_dir() . '/ls_quota_' . hash('sha256', $ip) . '.txt';
    $horodatages = [];
    if (is_readable($fichier)) {
        $brut = (string) file_get_contents($fichier);
        $horodatages = array_filter(array_map('intval', explode(',', $brut)));
    }
    $recents = array_filter($horodatages, static fn(int $t): bool => $t > time() - 3600);
    if (count($recents) >= QUOTA_PAR_HEURE) {
        repondre(false, 429);
    }
    $recents[] = time();
    file_put_contents($fichier, implode(',', $recents), LOCK_EX);
}

// ---------------------------------------------------------------- envoi
// Corps en TEXTE BRUT : aucun HTML, donc aucune exécution possible côté messagerie.
$corps = implode("\n", [
    'Nouvelle demande depuis le site le-sommer.fr',
    str_repeat('-', 44),
    '',
    'Sujet       : ' . $sujet,
    'Nom         : ' . $nom,
    'Entreprise  : ' . ($entreprise !== '' ? $entreprise : '(non renseignée)'),
    'Email       : ' . $email,
    'Téléphone   : ' . $telephone,
    '',
    'Message :',
    $message,
    '',
    str_repeat('-', 44),
    'Reçu le ' . date('d/m/Y à H:i'),
    'Répondez directement à cet email pour joindre le demandeur.',
]);

// L'expéditeur est TOUJOURS notre domaine : usurper l'adresse du visiteur ferait
// classer le message en spam. Son adresse sert uniquement en Reply-To.
$hote = $_SERVER['HTTP_HOST'] ?? 'le-sommer.fr';
$expediteur = 'site@' . preg_replace('/^www\./', '', $hote);

$entetes = [
    'From: Site LE SOMMER <' . $expediteur . '>',
    'Reply-To: ' . $nom . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'MIME-Version: 1.0',
    'X-Mailer: le-sommer.fr',
];

// Le sujet est encodé : un accent mal encodé casserait l'affichage côté boîte mail.
$sujetMail = '=?UTF-8?B?' . base64_encode('[Devis] ' . $sujet . ' — ' . $nom) . '?=';

$envoye = @mail(DESTINATAIRE, $sujetMail, $corps, implode("\r\n", $entetes), '-f' . $expediteur);

if (!$envoye) {
    error_log('[contact] Echec mail() vers ' . DESTINATAIRE);
    repondre(false, 502);
}

// Jeton consommé : il ne peut pas servir deux fois (protection contre le rejeu).
unset($_SESSION['csrf'], $_SESSION['form_time']);
repondre(true);
