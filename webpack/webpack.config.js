const path = require('path');
const fs = require('fs-extra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk');

let [TARGET, clientItem] = [process.env.npm_lifecycle_event, process.argv[2]];
if (TARGET == 'test') {
  clientItem = process.argv[6];
}
const vueLoader = {
  dev: "vue-style-loader",
  demo: "vue-style-loader",
  build: {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../',
      hmr: TARGET == 'build', // 仅dev环境启用HMR功能
    }
  },
  test: {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../',
      hmr: TARGET == 'build', // 仅dev环境启用HMR功能
    }
  },
  dll: MiniCssExtractPlugin.loader,
};

// 取本机IP地址
const getIPAdress = () => {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

//文件是否存在
const isFile = v => {
  return fs.pathExistsSync(v);
}

//取webpack entry 路口
const getEntry = () => {
  let entryObj = {};
  let isEmpty = "";
  let cur = clientItem && clientItem.toString().replace('/[,，=]/', ',').split(',');
  if (cur) {
    for (let item of cur) {
      let appPath = `${path.resolve(__dirname, '../src/client/')}\\${item}\\index.js`.replace(/[\\]/g, '/');
      if (!isFile(appPath)) {
        appPath = `${path.resolve(__dirname, '../src/client/')}\\${item}\\index.ts`.replace(/[\\]/g, '/');
      }
      if (isFile(appPath)) {
        entryObj[item] = appPath;
      } else {
        isEmpty = item;
      }
    }
  }
  return isEmpty ? { error: chalk.red.bold(`client no find ${isEmpty} module`) } : entryObj;
}

module.exports = {
  root: path.resolve(__dirname, '../'),
  entry: getEntry(),
  publicPath: '',
  outPath: path.resolve(__dirname, '../dist'),
  devPath: path.resolve(__dirname, '../build'),
  devServer: getIPAdress() || 'localhost',
  port: '6001',
  isFile: isFile,
  getIPAdress: getIPAdress,
  vueLoader: vueLoader[TARGET],
  isProd: TARGET == 'build',
  host: '0.0.0.0',
  clientItem: clientItem && clientItem.toString().replace('/[,，=]/', ',').split(','),
}