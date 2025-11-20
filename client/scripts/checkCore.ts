import { mkdirSync, statSync } from 'fs';
import { spawn } from 'child_process';

if (statSync('../toolbelt/src/main/proto/core.proto').mtimeMs > (statSync('src/gen/core.js', { throwIfNoEntry:false })?.mtimeMs ?? 0)) {
  console.log('Building core...');
  mkdirSync('src/gen', { recursive: true });
  spawn('pnpm', ['build:core'], { stdio: 'inherit', shell: true });
}
