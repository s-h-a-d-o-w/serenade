import { spawnSync } from 'child_process';

const build = spawnSync('pnpm', ['build'], { stdio: 'inherit', shell: true, cwd: 'static/custom-commands-server' });
process.exit(build.status);