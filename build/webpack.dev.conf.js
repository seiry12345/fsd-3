const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 8080,
    overlay: {
      warnings: false,
      errors: true,
      stats: 'errors-only',
      hot: true,
      open: true
    }
  },

  output: {
    publicPath: '/'
  },

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    })
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});