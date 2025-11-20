import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron-renderer'
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  root: 'src/renderer',
  build: {
    emptyOutDir: false,
    chunkSizeWarningLimit: 100000,
    outDir: path.join(__dirname, "out/renderer"),
    sourcemap: true,
  },
  plugins: [react(), electron()],
  server: {
    port: 4000,
  },
})
