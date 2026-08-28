import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://danishwestindies.org',
  i18n: {
    defaultLocale: "en",
    locales: ["en", "da", "es", "fr", "nl", "ak", "de", "nh"],
    routing: {
        prefixDefaultLocale: false
    }
  }
});
