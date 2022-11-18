const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.build.json');
module.exports = {
  preset: 'jest-preset',
  rootDir: '.',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        astTransformers: {
          before: ['<rootDir>/tests/e2e-transformer.js'],
        },
      },
    ],
  },
  // globalSetup: '<rootDir>/tests/jest/globalSetup.ts',
  // globalTeardown: '<rootDir>/tests/jest/globalTeardown.ts',
  setupFilesAfterEnv: ['<rootDir>/tests/jest/setupFilesAfterEnv.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
