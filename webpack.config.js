const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { experiments } = require("webpack");
const htmlPlugin = new HtmlWebPackPlugin({
 template: "./src/index.html",
 filename: "./index.html"
});

const copyPlugin = new CopyPlugin({
  patterns: [
    {
      from: "./src/manifest.json",
    },
    {
      from: "./src/sw.js",
    },
    {
      from: "./src/workbox-d249b2c8.js",
    },
    {
      from: "./src/assets",
      to: "assets"
    }
  ]
})

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
  plugins: [htmlPlugin, copyPlugin],
  experiments: {
    topLevelAwait: true
  }
};