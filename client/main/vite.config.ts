import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import { builtinModules } from "node:module";
import { banner, nodeTarget, commonConfig } from '../vite.shared';

const __dirname = dirname(fileURLToPath(import.meta.url));

const allCoreModules = builtinModules.flatMap((moduleName) => [
  moduleName,
  `node:${moduleName}`,
]);

export default defineConfig({
  build: {
    ...commonConfig,
    outDir: path.join(__dirname, "../out"),
    sourcemap: true,
    target: nodeTarget,
    lib: {
      entry: path.join(__dirname, "index.ts"),
      formats: ['es'],
      fileName: 'main',
    },
    rollupOptions: {
      // We have to exclude some modules that don't play nice but can't exclude all, since we need CJS interop.
      external: [
        ...allCoreModules,
        'electron',
        '@s-h-a-d-o-w/speech-recorder',
        '@s-h-a-d-o-w/serenade-driver',
        'ws'
      ],
      output: {
        banner,
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: '../static/custom-commands-server/node_modules/*',
          dest: 'static/custom-commands-server-modules'
        },
        {
          src: '../node_modules/@s-h-a-d-o-w/speech-recorder/build/Release/*',
          dest: 'Release'
        },
        {
          src: '../static/custom-commands-server/node_modules/@s-h-a-d-o-w/serenade-driver/build/Release/*',
          dest: 'Release'
        }
      ]
    })
  ],
})
