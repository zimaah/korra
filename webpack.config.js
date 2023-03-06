const HtmlWebPackPlugin = require("html-webpack-plugin");
const { experiments } = require("webpack");
const htmlPlugin = new HtmlWebPackPlugin({
 template: "./src/index.html",
 filename: "./index.html"
});

module.exports = {

mode: "development",
output: {
    filename: '[name].[chunkhash:4].js'
},
  module: {
    rules: [{
   test: /\.js$/,
   exclude: /node_modules/,
   use: {
     loader: "babel-loader"
   }
 },
  {
   test: /\.css$/,
   use: ["style-loader", "css-loader"]
  }
]},
 plugins: [htmlPlugin],
 experiments: {
  topLevelAwait: true
 }
};