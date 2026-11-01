const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts', // точка входу
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // вихідна директорія
    clean: true,
  },
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader', exclude: /node_modules/ },
      { test: /\.s?css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  devServer: { port: 9000, hot: true },
};
