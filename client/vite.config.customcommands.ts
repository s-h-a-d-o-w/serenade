import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  root: 'static/custom-commands-server',
  build: {
    outDir: '.',
    target: 'node22',
    sourcemap: false,
    lib: {
      entry: "./serenade-custom-commands-server.js",
      formats: ['cjs'],
      fileName: 'serenade-custom-commands-server.min',
    },
    emptyOutDir: false,
    chunkSizeWarningLimit: 100000,
  },
})
