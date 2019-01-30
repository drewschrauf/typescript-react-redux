/* eslint-disable import/no-extraneous-dependencies */
require('@babel/polyfill');
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

enzyme.configure({ adapter: new Adapter() });
