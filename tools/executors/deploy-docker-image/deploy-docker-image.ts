import { ExecutorContext, runExecutor } from '@nrwl/devkit';

export default async function tscExecutor(_: any, context: ExecutorContext) {
  const { projectName } = context;
  const { GITHUB_REF_NAME, GITHUB_SHA, GITHUB_BASE_REF } = process.env;
  const isProduction = GITHUB_BASE_REF === 'main';
  const suffix = !isProduction ? '-staging' : '';

  if (!projectName) throw new Error('project name not found');

  const image = `danbaggers/${
    projectName + suffix
  }:${GITHUB_REF_NAME}-${GITHUB_SHA}`;

  runExecutor(
    {
      project: projectName,
      target: 'deploy',
      configuration: isProduction ? 'production' : undefined,
    },
    { image },
    context
  );
}
