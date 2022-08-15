/* eslint-disable */
export default {
  displayName: 'api-portfolios',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/libs/api-portfolios',
  coveragePathIgnorePatterns: ['/node_modules', '/src/lib/entities/*'],
  coverageThreshold: {
    global: {
      functions: 90,
      lines: 90,
      branches: 90,
      statements: 90,
    },
  },
};
