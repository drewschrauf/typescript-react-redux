module.exports = {
  files: ['src/**/*.ts?(x)'],
  tests: ['test/**/*.spec.ts?(x)'],
  env: {
    type: 'node',
    runner: 'node'
  },
  testFramework: 'ava'
}
