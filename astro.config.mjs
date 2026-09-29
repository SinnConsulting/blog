import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL / BASE_PATH are set by the Pages workflow (actions/configure-pages).
// Locally the site builds for its production domain at the root.
const site = process.env.SITE_URL || 'https://blog.sinn.consulting';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
  redirects: {
    // The legal notice lives on the company site; the privacy policy is the blog's own.
    '/impressum': 'https://sinn.consulting/legal-notice.html',
    '/legal-notice': 'https://sinn.consulting/legal-notice.html',
    '/datenschutz': '/privacy/',
  },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
