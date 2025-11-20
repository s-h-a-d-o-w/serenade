import esbuild, { type BuildOptions, type Plugin } from "esbuild";
import { writeFile } from "node:fs/promises";
import { copy } from "esbuild-plugin-copy";
import { builtinModules } from "node:module";

// Why esbuild - vite doesn't provide interoperability with CJS:
// import { autoUpdater } from "electron-updater";
//          ^^^^^^^^^^^
// SyntaxError: Named export 'autoUpdater' not found. The requested module 'electron-updater' is a CommonJS module, which may not support all module.exports as named exports.

const watch = process.argv.includes("--watch");

async function main() {
  const buildOptions: BuildOptions = {
    banner: {
      js: `import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import{createRequire} from 'module';
const require = createRequire(import.meta.url);
`,
    },

    external: [
      "electron",
      ...builtinModules,
      ...builtinModules.map(m => `node:${m}`)
    ],
    bundle: true,
    minify: false,
    sourcemap: true,
    target: "node22",
    platform: "node",
    format: "esm",
    loader: {
      ".png": "file",
    },

    entryPoints: ["src/main/index.ts"],
    outfile: "out/main.js",
    logLevel: "info",
    plugins: [
      copy({
        resolveFrom: "cwd",
        assets: [
          {
            from: "static/custom-commands-server/node_modules/**/*",
            to: "out/static/custom-commands-server-modules",
          },
          {
            from: "node_modules/speech-recorder/build/Release/*",
            to: "out/Release",
          },
          {
            from: "node_modules/serenade-driver/build/Release/*",
            to: "out/Release",
          }
        ],
      }),
    ],
  };

  if (watch) {
    const ctx = await esbuild.context(buildOptions);
    await ctx.watch();
  } else {
    await esbuild.build(buildOptions);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
