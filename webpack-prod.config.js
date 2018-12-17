const config = require('./webpack.config.js');

// enable production mode
config.mode = 'production';
config.devtool = 'none';

// remove dashboard plugin
config.plugins.splice(2, 1);

// remove styled-component transformation
config.module.rules[0].options = {};

module.exports = config;
