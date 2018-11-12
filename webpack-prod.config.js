const config = require('./webpack.config.js');

config.mode = 'production';
config.devtool = 'none';

module.exports = config;
