var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ENV = process.env.NODE_ENV;


module.exports = {
  entry:{
    main: __dirname + "/main.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].js"
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    hot: true,
    port: 3334
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".css", ".less"]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(ENV)
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: "body"
    })
  ]
};