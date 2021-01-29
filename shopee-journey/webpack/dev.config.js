const merge = require('webpack-merge');
const common_config = require('./base.config.js');

module.exports = (env) => {
  return merge(common_config(env), {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      hot: true,
      proxy: {
        '/api/': {
          target: 'https://api.hackathon2021.shopee.sg',
          pathRewrite: { '^/api/': '/' },
          secure: false,
          changeOrigin: true, // for CORS
        },
      },
    },
  });
};
