import {
  Tree,
  formatFiles,
  installPackagesTask,
  generateFiles,
  joinPathFragments,
} from '@nrwl/devkit';
import { CronJobGeneratorSchema } from './schema';

export default async function (tree: Tree, schema: CronJobGeneratorSchema) {
  const appRoute = `apps/${schema.name}`;
  generateFiles(tree, joinPathFragments(__dirname, './files'), appRoute, {
    ...schema,
    tmpl: '',
  });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
