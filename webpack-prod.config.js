const config = require('./webpack.config.js');

// enable production mode
config.mode = 'production';
config.devtool = 'none';

module.exports = config;
