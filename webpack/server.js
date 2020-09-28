const webpack = require("webpack");
const webpackConfig = require("./webpack.dev.js");
let WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const path = require('path');
let config = require('./webpack.config.js');

let proxy = {};

if (Object.keys(config.entry).length == 1 && Object.keys(config.entry)[0] == 'error') {
  process.stderr.write(chalk.blueBright.bold(` 您输入的 模块文件名 有误，请重新输入 \n\n`));
  return;
}

config.clientItem.forEach(v => {
  let proxyUrl = path.join(config.root, `src/client/${v}/store/proxy.js`);
  if (config.isFile(proxyUrl)) {
    Object.assign(proxy, require(proxyUrl));
  }
})


const compiler = webpack(webpackConfig);
let devServerOptions = Object.assign({}, webpackConfig.devServer);
if (proxy && Object.keys(proxy).length) {
  Object.assign(devServerOptions, { proxy:proxy })
}

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(config.port, config.host, res => { });