import { execSync } from 'child_process';

export default function execute(command) {
  execSync(command, { stdio: 'inherit' });
};
