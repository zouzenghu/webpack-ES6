const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common");
const webpack = require("webpack");
const miniCssExtracPlugin = require("mini-css-extract-plugin");
module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    open: true,
    hot: true,
    port: 8080,
    hotOnly: true, //禁止浏览器自动刷新
    contentBase: path.join(process.cwd(), "dist")
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new miniCssExtracPlugin({
      filename: "./css/[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        //css处理
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: miniCssExtracPlugin.loader,
            options: {
              //解决css中引入图片位置错误问题（根据打包路径决定）
              publicPath: "../"
            }
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      }
    ]
  }
});
