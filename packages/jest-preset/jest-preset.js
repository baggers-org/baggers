/* eslint-disable */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  passWithNoTests: true,
  testPathIgnorePatterns: [
    'node_modules',
    'tests/suites',
    'dist',
    'build',
  ],
  coveragePathIgnorePatterns: ['node_modules', 'tests'],
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageThreshold: {
    global: {
      branches: 74,
      functions: 83,
      lines: 90,
    },
  },
};
