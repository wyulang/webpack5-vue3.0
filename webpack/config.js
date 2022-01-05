const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
let TARGET= process.env.npm_lifecycle_event;
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

module.exports = {
  root: path.resolve(__dirname, '../'),
  entry: path.resolve(__dirname, '../src/index.ts'),
  publicPath: '',
  devPath: path.resolve(__dirname, '../dist'),
  prodPath: path.resolve(__dirname, '../www'),
  devServer: getIPAdress() || 'localhost',
  port: '3006',
  isFile: isFile,
  isProd: TARGET == 'build',
  getIPAdress: getIPAdress,
  host: '0.0.0.0'
}