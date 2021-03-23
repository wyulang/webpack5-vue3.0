const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpack=require('webpack')
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
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  cache: {
    type: 'filesystem',
    store: 'pack'
  },
  devServer: {
    open: false,
    contentBase: config.devPath,
    publicPath: "/",
    compress: true,
    inline:true,
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