import { execSync } from 'child_process';

export default function execute(command, env) {
  execSync(command, { stdio: 'inherit', env });
};
