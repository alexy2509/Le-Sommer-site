import { escapeHtml } from './escape.mjs';
import { site } from './site-data.mjs';

function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Electrician',
    '@id': `${site.domain}/#organisation`,
    name: site.name,
    url: `${site.domain}/`,
    logo: `${site.domain}/assets/brand/logo-compact.png`,
    image: `${site.domain}/assets/brand/logo-compact.png`,
    telephone: site.phoneDisplay,
    email: site.email,
    founder: { '@type': 'Person', name: site.founder },
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      postalCode: site.address.postalCode,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.latitude, longitude: site.geo.longitude },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    areaServed: site.areaServed,
    sameAs: site.sameAs,
  };
}

function breadcrumbJsonLd(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.path ? { item: `${site.domain}${item.path}` } : {}),
    })),
  };
}

/**
 * @param {object} meta
 * @param {string} meta.title - ≤ 60 caractères, "Requête principale | LE SOMMER"
 * @param {string} meta.description - 140-155 caractères
 * @param {string} meta.path - chemin absolu avec trailing slash, ex. "/electricite-industrielle/"
 * @param {string} [meta.ogImage] - chemin absolu de l'image OG 1200x630
 * @param {Array}  [meta.breadcrumb] - trail [{label, path?}]
 * @param {Array}  [meta.jsonLd] - objets JSON-LD additionnels (Service, FAQPage, JobPosting…)
 */
export function head(meta) {
  const canonical = `${site.domain}${meta.path}`;
  const ogImage = meta.ogImage ? `${site.domain}${meta.ogImage}` : `${site.domain}/assets/img/og-default.jpg`;
  const jsonLdBlocks = [organizationJsonLd(), ...(meta.breadcrumb ? [breadcrumbJsonLd(meta.breadcrumb)] : []), ...(meta.jsonLd ?? [])];

  return `<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(meta.title)}</title>
<meta name="description" content="${escapeHtml(meta.description)}" />
<link rel="canonical" href="${canonical}" />
<meta name="theme-color" content="#0097a9" />
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />

<link rel="preload" href="/assets/fonts/manrope-800.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/assets/fonts/inter-400.woff2" as="font" type="font/woff2" crossorigin />
${(meta.preloads ?? []).join('\n')}

<meta property="og:type" content="website" />
<meta property="og:locale" content="fr_FR" />
<meta property="og:site_name" content="${escapeHtml(site.name)}" />
<meta property="og:title" content="${escapeHtml(meta.title)}" />
<meta property="og:description" content="${escapeHtml(meta.description)}" />
<meta property="og:url" content="${canonical}" />
<meta property="og:image" content="${ogImage}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeHtml(meta.title)}" />
<meta name="twitter:description" content="${escapeHtml(meta.description)}" />
<meta name="twitter:image" content="${ogImage}" />

<link rel="stylesheet" href="/styles/main.css" />
${jsonLdBlocks.map((block) => `<script type="application/ld+json">${JSON.stringify(block)}</script>`).join('\n')}
</head>`;
}
