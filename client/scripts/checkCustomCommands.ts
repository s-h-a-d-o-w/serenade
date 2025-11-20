import { statSync } from 'fs';
import { spawn } from 'child_process';

if (statSync('static/custom-commands-server/serenade-custom-commands-server.js').mtimeMs > (statSync('static/custom-commands-server/serenade-custom-commands-server.min.js', { throwIfNoEntry:false })?.mtimeMs ?? 0)) {
  console.log('Building custom commands server...');
  spawn('npm', ['install'], { cwd: 'static/custom-commands-server', stdio: 'inherit', shell: true });
  spawn('pnpm', ['build:customcommands'], { stdio: 'inherit', shell: true });
}
