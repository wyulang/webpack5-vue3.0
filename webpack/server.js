const webpack = require("webpack");
const webpackConfig = require("./webpack.dev.js");
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config.js');


const compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer);
const server = new WebpackDevServer(compiler, devServerOptions);


server.listen(config.port, config.host, res => {});