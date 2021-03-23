  
const webpack = require('webpack') // 加载 webpack
const webpackConfig = require("./webpack.prod.js");
const chalk = require('chalk');
// let config = require('./webpack.config.js');


process.stderr.write(chalk.blueBright.bold(` build start ..... \n\n`));
webpack(webpackConfig, (err, state) => {});