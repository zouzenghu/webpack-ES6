const path = require("path");
const webpack = require("webpack");
module.exports = {
  mode: "production",
  //只做第一次打包分析
  entry: {
    //将第三方库进行单独打包（dll）优化
    jquery: ["jquery"]
  },
  output: {
    filename: "[name].dll.js",
    path: path.join(process.cwd(), "dll"),
    library: "[name]"
  },
  plugins: [
    new webpack.DllPlugin({
      name: "[name]",
      //将第三方的映射关系放入dll/[name].manifest.json文件中
      //webpack会拿着这个json文件分析，如果引入的库在dll文件中打包有，就不会再去node_modules文件夹下重新打包
      path: path.join(process.cwd(), "dll/[name].manifest.json")
    })
  ]
};
