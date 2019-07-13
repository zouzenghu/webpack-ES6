const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const miniCssExtracPlugin = require("mini-css-extract-plugin");
module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    new miniCssExtracPlugin({
      filename: "./css/[name].[contenthash].css",
      chunkFilename: "./css/[id].[contenthash].css"
    })
  ],
  output: {
    // publicPath:'http://cdn' 处理cdn地址
    filename: "./js/[name].[contenthash].js",
    path: path.join(process.cwd(), "dist"),
    chunkFilename: "./js/[name].[contenthash].js"
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    //production模式下Tree Shaking已经默认配置好了
    usedExports: true,
    minimizer: [new optimizeCssAssetsWebpackPlugin({}), new UglifyJsPlugin()]
    //配置contenthash
    // runtimeChunk: {
    //   name: "runtime"
    // }
  },
  //babel的配置
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
      },
      {
        test: /\.js$/,
        //忽略node_modules中的文件
        exclude: /node_modules/,
        //只对src目录下做babel-loader转换
        include: path.join(process.cwd(), "src"),
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  }
});
