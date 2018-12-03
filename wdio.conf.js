exports.config = {
  specs: ['./test/specs/**/*.ts'],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
    },
  ],
  sync: true,
  logLevel: 'silent',
  coloredLogs: true,
  deprecationWarnings: true,
  bail: 0,
  screenshotPath: './errorShots/',
  baseUrl: 'http://localhost:8080',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
  },
  before: () => {
    /* eslint-disable global-require, import/no-extraneous-dependencies */
    const ts = require('ts-node');
    ts.register(require('./test/tsconfig.json'));
    /* eslint-enable global-require, import/no-extraneous-dependencies */
  },
};
