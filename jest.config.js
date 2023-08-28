/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      lines: 80
    }
  },
  injectGlobals: true,
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: './jest.tsconfig.json' }]
  }
}
