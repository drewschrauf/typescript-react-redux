/* eslint-disable @typescript-eslint/explicit-function-return-type */
const defaultValue = config => (Array.isArray(config) ? [] : {});
const addIfEnv = (env, config) => (env ? config : defaultValue(config));

const isProduction = process.env.NODE_ENV === 'production';

exports.isProduction = isProduction;
exports.addIfProd = addIfEnv.bind(null, isProduction);
exports.addIfDev = addIfEnv.bind(null, !isProduction);
