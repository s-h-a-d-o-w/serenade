import { spawnSync } from 'child_process';

const npmInstall = spawnSync('npm', ['install'], {
  cwd: 'static/custom-commands-server',
  stdio: 'inherit',
  shell: true
});

process.exit(npmInstall.status);
