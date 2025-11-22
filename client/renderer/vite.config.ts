import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron-renderer'
import path from 'path'
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite'
import { commonConfig } from '../vite.shared';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  build: {
    ...commonConfig,
    outDir: path.join(__dirname, "../out/renderer"),
    sourcemap: true,
  },
  plugins: [react(), electron(), tailwindcss()],
  server: {
    port: 4000,
  },
})
