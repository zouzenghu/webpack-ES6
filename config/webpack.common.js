const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const package = require("../package.json");
const webapck = require("webpack");
module.exports = {
  entry: {
    // venter:Object.keys(package.dependencies),
    main: path.join(process.cwd(), "src/index.js")
  },
  output: {
    // publicPath:'http://cdn' 处理cdn地址
    filename: "./js/[name].js",
    path: path.join(process.cwd(), "dist"),
    chunkFilename: "[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(process.cwd(), "src/index.html"),
      chunks: ["main"],
      minify: true
    })
    //当模块中发现$字符自动注入jquery库
    //解决：依赖使用jquery的类库，如jquery-ui组件库
    // new webapck.ProvidePlugin({
    //   $: "jquery"
    // })
  ],
  module: {
    rules: [
      {
        //处理图片资源引用
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 2048,
            fallback: "file-loader",
            outputPath: "./images",
            name: "[name].[ext]"
          }
        }
      },
      {
        //处理字体文件
        test: /\.(eot|ttf|svg|woff)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "./fonts/[name].[ext]"
          }
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
          options: {
            attrs: ["img:src", "img:data-src", "audio:src"],
            minimize: true
          }
        }
      }
      // {
      //   test: /\.js$/,
      //   //忽略node_modules中的文件
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       //将每个模块的this指向为window
      //       loader: "imports-loader?this=>window"
      //     }
      //   ]
      // }
    ]
  }
};
