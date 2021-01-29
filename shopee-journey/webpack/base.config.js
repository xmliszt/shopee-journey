const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '../build');
const APP_DIR = path.resolve(__dirname, '../src');

module.exports = function(env) {
  const scope =
    env.env === 'dev' ? '[local]__[hash:base64:6]' : '[hash:base64:6]';

  const file_name =
    env.env === 'dev' ? '[name]-[hash].js' : '[name]-[chunkhash].js';

  const css_file_name = env.env === 'dev' ? '[name].css' : '[contenthash].css';

  return {
    entry: {
      app: [APP_DIR + '/styles/common/index.scss', APP_DIR + '/index.tsx'],
    },
    output: {
      path: BUILD_DIR,
      filename: `js/${file_name}`,
      publicPath: '/',
      chunkFilename: `js/${file_name}`,
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        minSize: 50000,
        name: true,
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            enforce: true,
          },
        },
      },
      minimizer:
        env.env === 'dev'
          ? []
          : [
              new TerserPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
              }),
              new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true,
              }),
            ],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          include: APP_DIR,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              [
                '@babel/preset-env',
                { targets: { browsers: 'last 2 versions' } },
              ],
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
              [
                'react-css-modules',
                {
                  generateScopedName: scope,
                  filetypes: {
                    '.scss': {
                      syntax: 'postcss-scss',
                    },
                  },
                },
              ],
              'react-hot-loader/babel',
            ],
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'css-hot-loader',
            },
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1,
                modules: {
                  localIdentName: scope,
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [path.resolve(APP_DIR, 'styles/common/')],
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [require('autoprefixer')],
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|gif|png)$/,
          loader: 'file-loader',
          query: 'name=[name].[ext]?[hash]&outputPath=assets/images/&publicPath=/assets/images/',
        },
        {
          test: /\.(woff|woff2|ttf|otf|eot)$/,
          loader: 'file-loader',
          query: 'name=[name].[ext]?[hash]&outputPath=assets/fonts/&publicPath=/assets/fonts/',

        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'react-svg-loader',
            },
          ],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin(
        [
          {
            from: APP_DIR + '/assets/common/images',
            to: BUILD_DIR + '/assets/images',
          },
          {
            from: APP_DIR + '/assets/common/vendors',
            to: BUILD_DIR + '/assets/vendors',
          },
        ],
        {
          ignore: [],
          copyUnmodified: false,
        }
      ),

      new HtmlWebpackPlugin({
        filename: BUILD_DIR + '/index.html',
        template: APP_DIR + `/template/index.html`,
        cache: true,
        inject: false,
        chunksSortMode: 'none',
        title: 'Shopee Hackathon',
      }),

      new MiniCssExtractPlugin({
        filename: `assets/css/${css_file_name}`,
      }),

      new InlineManifestWebpackPlugin(),
    ],
    devServer: {
      historyApiFallback: true,
    },
    externals: {
      env: JSON.stringify(require(APP_DIR + `/envs/${env.env}.json`)),
    },
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: [
        path.resolve(APP_DIR),
        path.resolve(__dirname, '../node_modules'),
      ],
    },
  };
};
