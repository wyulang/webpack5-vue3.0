const webpack = require("webpack");
const webpackConfig = require("./webpack.dev.js");
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config.js');


const compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer);

// Object.assign(devServerOptions, {
//   proxy: {
//     '/api': {
//       target: 'http://demo.ndky.edu.cn',  // 正式环境
//       changeOrigin: true,
//       pathRewrite: { '^/api': '' }
//     }
//   }
// })

const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(config.port, config.host, res => {});
