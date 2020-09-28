const webpack = require('webpack') // 加载 webpack
const webpackConfig = require("./webpack.prod.js");
const chalk = require('chalk');
let config = require('./webpack.config.js');

// if(Object.keys(config.entry).length==0){
//   process.stderr.write(chalk.blueBright.bold(` 请输入要打包的对像 如 npm run build demo  \n\n`));
//   return;
// }

// if(Object.keys(config.entry).length>1){
//   process.stderr.write(chalk.blueBright.bold(` 只能单独打包 \n\n`));
//   return;
// }

// if(Object.keys(config.entry).length==1 && Object.keys(config.entry)[0]=='error'){
//   process.stderr.write(chalk.blueBright.bold(` 您输入的 模块文件名 有误，请重新输入 \n\n`));
//   return;
// }

process.stderr.write(chalk.blueBright.bold(` build start ..... \n\n`));
webpack(webpackConfig, (err, state) => {});

