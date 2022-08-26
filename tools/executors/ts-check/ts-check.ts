import { ExecutorContext } from '@nrwl/devkit';
import { spawn } from 'child_process';

export default async function tscExecutor(_, context: ExecutorContext) {
  const packageManagerCmd = 'npx';

  const libRoot = context.workspace.projects[context.projectName].root;

  const executionCode = await new Promise((resolve) => {
    const child = spawn(packageManagerCmd, ['tsc', '-b', libRoot], {
      stdio: 'inherit',
    });
    child.on('data', (args) => console.log(args));
    child.on('close', (code) => resolve(code));
  });

  return { success: executionCode === 0 };
}
