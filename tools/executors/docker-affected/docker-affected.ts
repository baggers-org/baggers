import { ExecutorContext } from '@nrwl/devkit';
import { run } from '@nx-tools/nx-docker';
import { DockerBuildSchema } from '@nx-tools/nx-docker/src/executors/build/schema';
import { join } from 'path';

export default async function tscExecutor(
  options: DockerBuildSchema,
  context: ExecutorContext
) {
  const { projectName, cwd } = context;
  const { GITHUB_REF_NAME, GITHUB_SHA, GITHUB_BASE_REF } = process.env;
  if (!projectName) throw new Error('project name not found');

  const dockerfilePath = join(cwd, 'apps', projectName, 'Dockerfile');

  const suffix = GITHUB_BASE_REF === 'develop' ? '-staging' : '';

  return run({
    ...options,
    tags: [
      `registry.fly.io/${
        projectName + suffix
      }:${GITHUB_REF_NAME}-${GITHUB_SHA}`,
    ],
    context: '.',
    'build-args': [`COMMIT_SHA=${GITHUB_SHA}`],
    'cache-from': ['type=local,src=/tmp/.buildx-cache'],
    'cache-to': ['type=local,mode=max,dest=/tmp/.buildx-cache-new'],
    file: dockerfilePath,
  });
}
