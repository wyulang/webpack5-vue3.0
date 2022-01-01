  
const webpack = require('webpack') // 加载 webpack
const webpackConfig = require("./prod.js");
const chalk = require('chalk');

process.stderr.write(chalk.blueBright.bold(` build start ..... \n\n`));
webpack(webpackConfig, (err, state) => {
  if (err) throw err
});