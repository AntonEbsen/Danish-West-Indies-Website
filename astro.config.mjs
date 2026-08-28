import { defineConfig } from 'astro/config';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://danishwestindies.org',

  i18n: {
    defaultLocale: "en",
    locales: ["en", "da", "es", "fr", "nl", "ak", "de", "nh", "yo", "ig", "kg", "sv", "pt"],
    routing: {
        prefixDefaultLocale: false
    }
  },

  integrations: [sitemap()]
});