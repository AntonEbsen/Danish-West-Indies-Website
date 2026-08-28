import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://danishwestindies.org',
  i18n: {
    defaultLocale: "en",
    locales: ["en", "da"],
    routing: {
        prefixDefaultLocale: false
    }
  }
});
