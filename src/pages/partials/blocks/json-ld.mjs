import { site } from '../site-data.mjs';

/** JSON-LD `Service`, rattaché à l'organisation déclarée dans le <head>. */
export function serviceJsonLd({ name, description, path, areaServed = site.areaServed }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    description,
    provider: { '@id': `${site.domain}/#organisation` },
    areaServed,
    url: `${site.domain}${path}`,
  };
}
