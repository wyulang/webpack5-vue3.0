const path = require('path');
const fs = require('fs-extra');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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

const [TARGET, clientItem] = [process.env.npm_lifecycle_event, process.argv[2]];

const vueLoader = {
  dev: "vue-style-loader",
  build: {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  },
  test: {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  },
  pack: {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../',
      hmr: TARGET == 'build', // 仅dev环境启用HMR功能
    }
  },
  dll: MiniCssExtractPlugin.loader,
};

module.exports = {
  root: path.resolve(__dirname, '../'),
  entry: path.resolve(__dirname, '../src/index.ts'),
  publicPath: '',
  outPath: path.resolve(__dirname, '../www'),
  devServer: getIPAdress() || 'localhost',
  port: '3008',
  isFile: isFile,
  getIPAdress: getIPAdress,
  vueLoader: vueLoader[TARGET],
  host:'0.0.0.0'
}