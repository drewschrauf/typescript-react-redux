module.exports = {
  files: ['src/**/*.ts?(x)', '!src/**/__tests__/**/*.test.ts?(x)'],
  tests: ['src/**/__tests__/**/*.test.ts?(x)'],
  env: {
    type: 'node',
    runner: 'node',
  },
  testFramework: 'jest',
};
