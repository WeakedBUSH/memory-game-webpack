const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const path = require('path');

 module.exports = {
  
   entry: './src/main.js',
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
     publicPath: "./",
     assetModuleFilename: 'assets/img/[name][ext][query]'
   },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  }), new MiniCssExtractPlugin({
    filename: 'styles.css'
  })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ]
  },
  devServer: {
    static: './dist',
    port: 8000,
  },
  
 };