const defaultValue = config => (Array.isArray(config) ? [] : {});
const addIfEnv = (env, config) => (env ? config : defaultValue(config));

const isProduction = process.env.NODE_ENV === 'production';

exports.addIfProd = addIfEnv.bind(null, isProduction);
exports.addIfDev = addIfEnv.bind(null, !isProduction);
