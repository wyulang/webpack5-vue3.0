let HtmlWebpackPlugin = require('html-webpack-plugin');
let config = require('./webpack.config.js');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const _version = new Date().getTime();

// happypack

module.exports = {
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
      'lib': path.join(config.root, 'lib/'),
      '@css': path.join(config.root, 'css'),
      '@component': path.join(config.root, 'src/component'),
      'vue': '@vue/runtime-dom',
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
        }
      ]
    },
    {
      test: /\.vue$/,
      use: 'vue-loader'
    },
    {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: [
        "babel-loader",
        {
          loader: "ts-loader",
          options: { appendTsxSuffixTo: [/\.vue$/] }
        }
      ]
    },
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
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
    // new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   manifest: require('./vendor/vue-manifest.json')
    // }),
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: config.root + '/webpack/index.html',
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
    // new AddAssetHtmlPlugin({
    //   filepath: path.resolve(__dirname, './vendor/vue.library.js'),
    //   outputPath: 'js',
    //   publicPath: './js'
    // })
  ]
}