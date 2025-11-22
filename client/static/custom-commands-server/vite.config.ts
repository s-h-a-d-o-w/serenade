import { builtinModules } from 'node:module';
import { defineConfig } from 'vite'
import packageJson from './package.json';
import { banner, nodeTarget, commonConfig } from '../../vite.shared';

const allCoreModules = builtinModules.flatMap((moduleName) => [
  moduleName,
  `node:${moduleName}`,
]);

const allDependencies = Object.keys(packageJson.dependencies);

// https://vite.dev/config/
export default defineConfig({
  build: {
    ...commonConfig,
    outDir: '.',
    sourcemap: false,
    target: nodeTarget,
    lib: {
      entry: "./serenade-custom-commands-server.ts",
      formats: ['es'],
      fileName: 'serenade-custom-commands-server.min',
    },
    rollupOptions: {
      external: [...allCoreModules, ...allDependencies],
      output: {
        banner
      },
    },
  },
})
