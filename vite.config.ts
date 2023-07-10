import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss';
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    createHtmlPlugin(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  server: {
    host: true,
    port: 3000,
  },
  build: {
    manifest: true
  }
});
