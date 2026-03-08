import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        collections: resolve(__dirname, "collections.html"),
        product: resolve(__dirname, "product.html"),
        about: resolve(__dirname, "about.html"),
        contact: resolve(__dirname, "contact.html"),
        search: resolve(__dirname, "search.html"),
      },
    },
  },
});
