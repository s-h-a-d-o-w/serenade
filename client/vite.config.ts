import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import { builtinModules } from "node:module";

const __dirname = dirname(fileURLToPath(import.meta.url));

const allCoreModules = builtinModules.flatMap((moduleName) => [
  moduleName,
  `node:${moduleName}`,
]);

const globalsForAllCoreModules = allCoreModules.reduce((acc, moduleName) => {
  const [prefix, namePart] = moduleName.split(":");
  acc[moduleName] = prefix === "node" ? namePart : moduleName;
  return acc;
}, {} as Record<string, string>);

export default defineConfig({
  build: {
    // emptyOutDir: false,
    // chunkSizeWarningLimit: 100000,
    outDir: path.join(__dirname, "out"),
    lib: {
      entry: path.join(__dirname, "./src/main/index.ts"),
      formats: ['es'],
      fileName: 'main',
    },
    rollupOptions: {
      // We have to exclude some modules that don't play nice but can't exclude all, since we need CJS interop.
      external: [
        ...allCoreModules,
        'electron',
        'speech-recorder',
        'serenade-driver',
        'ws'
      ],
      output: {
        globals: globalsForAllCoreModules,
        inlineDynamicImports: true,
        banner: `import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { createRequire } from 'module';
const require = createRequire(import.meta.url);`,
      },
    },
    target: 'node22',
    sourcemap: false,
    minify: false,
    emptyOutDir: false,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'static/custom-commands-server/node_modules/*',
          dest: 'static/custom-commands-server-modules'
        },
        {
          src: 'node_modules/speech-recorder/build/Release/*',
          dest: 'Release'
        },
        {
          src: 'node_modules/serenade-driver/build/Release/*',
          dest: 'Release'
        }
      ]
    })
  ],
})
