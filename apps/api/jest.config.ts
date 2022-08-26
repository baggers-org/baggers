/* eslint-disable */
export default {
  displayName: 'api',
  preset: '../../jest.preset.js',
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
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules', 'tests/suites', 'dist'],
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/api',
};
