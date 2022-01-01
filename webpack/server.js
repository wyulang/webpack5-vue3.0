const webpack = require("webpack");
const webpackConfig = require("./dev.js");
let WebpackDevServer = require('webpack-dev-server');
let config = require('./config.js');


const compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({
  open: false,
  port: config.port,
  host: config.host,
  liveReload: false,
  hot: true
});

// Object.assign(devServerOptions, {
//   proxy: {
//     '/api': {
//       target: 'http://demo.ndky.edu.cn',  // 正式环境
//       changeOrigin: true,
//       pathRewrite: { '^/api': '' }
//     }
//   }
// })


const server = new WebpackDevServer(devServerOptions, compiler);

server.start(config.port, config.host, res => {
  if(res) {
    process.exit(0)
  }
});


