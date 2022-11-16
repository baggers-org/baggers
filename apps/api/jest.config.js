const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');
module.exports = {
  preset: 'jest-preset',
  rootDir: '.',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      astTransformers: {
        before: ['<rootDir>/tests/e2e-transformer.js'],
      },
    },
  },
  setupFilesAfterEnv: ['<rootDir>/tests/jest/setup.ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
