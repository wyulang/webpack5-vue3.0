const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {merge} = require('webpack-merge');
const webpackbase = require('./webpack.base.js');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const _version = new Date().getTime();
const config = require('./webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');//压缩代码
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk');

const webpackProdConfig = {
  devtool: 'inline-cheap-source-map',
  mode: 'production',
  entry: config.entry,
  output: {
    path: `${config.outPath}/`,
    publicPath: './',
    filename: `js/[name].${_version}.js`,
    chunkFilename: `js/chunk.[name].${_version}.js`,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 6,
        terserOptions: {
          compress: {
            warnings:false,
            drop_console: true,
            drop_debugger:true,
          },
        },
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano')
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/[name].${_version}.css`,
      chunkFilename: `css/build.[name].${_version}.css`
    }),
    new ProgressBarPlugin(
      {
        format: chalk.blueBright(' build :bar :percent (:elapsed seconds) '),
        clear: false,
        summary: false,
        customSummary: res => {
          process.stderr.write(chalk.blueBright.bold(` build success use time ${res} \n`))
        }
      }
    )
  ]
}

module.exports = merge(webpackbase, webpackProdConfig)