/* eslint-disable */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules', 'tests/suites', 'dist'],
  coveragePathIgnorePatterns: ['node_modules', 'tests'],
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
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
