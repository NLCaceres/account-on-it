/// <reference types="vitest" />
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    laravel({ // Order doesn't seem to matter for this input BUT it does matter in vue.blade.php's matching vite()
      input: ["resources/js/app.ts", "node_modules/jquery/dist/jquery.min.js", "node_modules/fomantic-ui-css/semantic.min.js"],
      refresh: true
    }),
    vue({
      template: {
        transformAssetUrls: { // This Vue plugin re-writes asset URLs in SFCs so it points to the Laravel app
          base: null, // Setting to `null` lets the Laravel plugin re-write asset URLs to point to the Vite server instead

          // The Vue plugin parses absolute URLs as paths to files on disk
          includeAbsolute: false, // Setting to `false` leaves absolute URLs un-touched so refs to the public directory work correctly
        },
      },
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["resources/js/Tests/setup.js"]
  }
});