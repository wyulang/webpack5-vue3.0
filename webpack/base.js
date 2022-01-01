let HtmlWebpackPlugin = require('html-webpack-plugin');
let config = require('./config.js');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const _version = new Date().getTime();

let webpackBase = {
  entry: config.entry,
  output: {
    filename: 'js/bundle.js',
    path: config.outPath,
    publicPath: './',
    chunkFilename: 'js/[name].' + _version + '.js',
    library: '[name]_library'
  },
  resolve: {
    alias: {
      '@lib': path.join(config.root, 'lib'),
      '@css': path.join(config.root, 'css'),
      '@component': path.join(config.root, 'component'),
    },
    modules: ['node_modules', '*'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue']
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.css$/,
        use: [
          config.isProd ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../' //这个很重要，与url-loader 生成的图片路经一至，需要这里设置
            }
          } : {
            loader: 'vue-style-loader',
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: config.isProd,
              importLoaders: 1,
              esModule: false

            }
          },
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
          config.isProd ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          } : 'style-loader',
          {
            loader: "css-loader",
            options: {
              sourceMap: config.isProd,
              importLoaders: 1,
              esModule: false

            }
          },
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
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: config.isProd
            },
          },
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            onlyCompileBundledFiles: true,
            transpileOnly: true,
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.m?jsx?$/,
        exclude: (file) => {
          if (/\.vue\.jsx?$/.test(file)) {
            return false
          }
          return /node_modules/.test(file)
        },
        use: ['thread-loader', 'babel-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/i,
        dependency: { not: ['url'] },
        use: [
          {
            loader: 'url-loader',
            options: {
              name: `assets/[name].[hash:5].[ext]`,
              limit: 200, 
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,   // 处理字体
        use: {
          loader: 'file-loader',
          options: {
            name: `assets/[name].[hash:5].[ext]`,
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      // 定义环境和变量
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: config.isProd
    }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: config.root + '/src/index.html',
      title: 'demo',
      prod: true,
      hash: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true
      }
    }),
  ]
}


module.exports = webpackBase;