// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Byt "site" till den riktiga adressen när domänen är klar.
export default defineConfig({
  site: 'https://sagik-hudiksvall.pages.dev',
  integrations: [sitemap()],
});
