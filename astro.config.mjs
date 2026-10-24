import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://danishwestindies.org',
  // Only the curated publication is deployed. src/ retains unpublished prototypes.
  srcDir: './publication',
  publicDir: './publication/public',
  output: 'static',
  trailingSlash: 'always',

  i18n: {
    defaultLocale: "en",
    locales: ["en", "da"],
    routing: {
        prefixDefaultLocale: false
    }
  },

  integrations: [sitemap()]
});
