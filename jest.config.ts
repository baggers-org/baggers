import { getJestProjects } from '@nrwl/jest';

export default {
  projects: getJestProjects(),
  resolver: '@nrwl/jest/plugins/resolver',
};
