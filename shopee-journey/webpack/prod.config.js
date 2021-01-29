const merge = require('webpack-merge');
const common_config = require('./base.config.js');

const webpack = require('webpack');

module.exports = function(env) {
  return merge(common_config(env), {
    mode: 'production',
    plugins: [
      new webpack.HashedModuleIdsPlugin(),

      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 10,
        minChunkSize: 50000,
      }),
    ],
  });
};
