module.exports = function(env) {
  const config = require(`./webpack/${env.env}.config.js`);
  return config(env);
};
