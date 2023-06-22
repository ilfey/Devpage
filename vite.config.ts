import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss';
import react from '@vitejs/plugin-react-swc'
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
