const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpack = require('webpack')
const { merge } = require('webpack-merge');
let config = require('./webpack.config.js');
const chalk = require('chalk');
const webpackbase = require('./webpack.base.js');

let conlg = [];

conlg.push(chalk.blueBright.bold('Your application is running here: ') + chalk.greenBright.bold(`http://${config.devServer}:${config.port}/`));
conlg.push(chalk.blueBright.bold('Your application is running here: ') + chalk.greenBright.bold(`http://localhost:${config.port}/`));

let webpackDevConfig = {
  mode: 'development',
  entry: config.entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      minSize: 20000,
      maxAsyncRequests: 10,
      cacheGroups: {
        vendor: { // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'common', // 打包后的文件名，任意命名
          priority: 10// 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  devServer: {
    open: false,
    contentBase: config.devPath,
    publicPath: "/",
    compress: true,
    inline: true,
    noInfo: true,
    port: config.port,
    host: config.host
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: conlg
      }
    }),
    new ProgressBarPlugin(
      {
        format: chalk.blueBright('  build :bar :percent (:elapsed seconds) '),
        clear: true,
        summary: false,
        customSummary: res => {
          process.stderr.write(chalk.blueBright('   '))
        }
      }
    ),
  ]
}

module.exports = merge(webpackbase, webpackDevConfig)
