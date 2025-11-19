import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron-renderer'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  base: './',
  build: {
    outDir: path.join(__dirname, "../../out/renderer"),
  },
  plugins: [react(), electron()],
  server: {
    port: 4000,
  },
})
