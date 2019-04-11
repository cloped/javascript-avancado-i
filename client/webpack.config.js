const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const devMode = (argv) => {
  return argv.mode === 'development';
}

module.exports = (env, argv) => ({
  entry: {
    app: './src/index.js',
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ]
  },

  optimization: {
    providedExports: true,
    usedExports: true,
    concatenateModules: true
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),

    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: './main/index.html',
      chunks: ['app'],
      minify: devMode(argv) ? {} : {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
      }
    }),

    new MiniCssExtractPlugin({
      filename: devMode(argv) ? '[name].css' : '[name].optimize.css',
      chunkFilename: devMode(argv) ? '[id].css' : '[id].optimize.css',
    }),

    new CleanWebpackPlugin(['dist']),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
  ],
});
