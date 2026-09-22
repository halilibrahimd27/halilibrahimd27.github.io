import type { APIRoute } from 'astro';
import { absoluteUrl, assetHref } from '../i18n/utils';

/**
 * robots.txt — build sırasında üretilir.
 * Sitemap adresi BASE ile birlikte hesaplanır; proje repo'suna taşınsa da
 * doğru kalır.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = absoluteUrl(assetHref('sitemap-index.xml'), site);

  const body = ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
