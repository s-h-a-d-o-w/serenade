import type { BuildOptions } from "vite";

export const commonConfig = {
  emptyOutDir: false,
  chunkSizeWarningLimit: 100000,
} satisfies BuildOptions;

export const banner = `import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { createRequire } from 'module';
const require = createRequire(import.meta.url);`;

export const nodeTarget = 'node22' satisfies BuildOptions['target'];