let HtmlWebpackPlugin = require('html-webpack-plugin');
// compression-webpack-plugin
// html-webpack-tags-plugin
let config = require('./webpack.config.js');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let webpackBase = {
  resolve: {
    alias: {
      'lib': path.join(config.root, 'lib/'),
      '@css': path.join(config.root, 'css'),
      '@component': path.join(config.root, 'src/component'),
      'vue': '@vue/runtime-dom/dist/runtime-dom.esm-bundler',
      'vuex': 'vuex/dist/vuex.esm-bundler',
      'vue-router': 'vue-router/dist/vue-router.esm-bundler',
      '@src': path.join(config.root, 'src')
    },
    modules: ['node_modules', '*'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue']
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        config.vueLoader,
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            sourceMap: config.isProd,
            postcssOptions: {
              plugins: [
                ['autoprefixer'],
              ],
            },
          }
        }
      ]
    },
    {
      test: /\.less$/,
      use: [
        config.vueLoader, {
          loader: "css-loader"
        }, {
          loader: "postcss-loader",
          options: {
            sourceMap: config.isProd,
            postcssOptions: {
              plugins: [
                ['autoprefixer'],
              ],
            },
          }
        }, {
          loader: "less-loader",
        }, {
          loader: 'sass-resources-loader',
          options: {
            resources: path.join(config.root, 'css/base.less'),
          }
        }
      ]
    },
    {
      test: /\.vue$/,
      use: 'vue-loader'
    },
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
          options: { babelrc: true }
        },
        {
          loader: "ts-loader",
          options: { appendTsSuffixTo: [/\.vue$/] }
        }
      ]
    },
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/,
      // include: [process.cwd(), './src']
    },
    {
      test: /\.(gif|png|jpe?g|svg|ico)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            name: `assets/[name].[hash:5].[ext]`,
            limit: 200, // 小于8k的图片自动转成base64格式，并且不会存在实体图片,
            // publicPath:'./'
          }
        }
        // , {
        //   loader: 'image-webpack-loader'
        // },
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,   // 处理字体
      use: {
        loader: 'file-loader',
        options: {
          name: `assets/[name].[hash:5].[ext]`,
          publicPath: '../'
        }
      }
    }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor/vue-manifest.json'),
      sourceType: 'umd',
      scope: 'xyz'
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, './vendor/vue.library.js'),
      publicPath: config.isProd ? "./js" : '../',
      outputPath: config.isProd ? "js" : "",
    })
  ]
}

let clearFile = [];
for (item in config.entry) {
  clearFile.push(`${item}/*`);
  let templist = path.join(config.root, `./src/client/${item}/index.html`);
  htmlConfig = {
    template: templist,
    inject: true,
    title: 'wyulang',
    host: config.distPath,
    prod: false,
  }
  if (config.isProd) {
    htmlConfig.filename = `index.html`;
  } else {
    htmlConfig.chunks = [item];
    htmlConfig.filename = `${item}/index.html`;
  }
  webpackBase.plugins.push(
    new HtmlWebpackPlugin(htmlConfig)
  )
}

webpackBase.plugins.push(
  new CleanWebpackPlugin()
)


module.exports = webpackBase;