const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: resolve(__dirname, '../src/render/App.tsx'),
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  target: 'electron-renderer',
  resolve: {
    extensions: ['.ts', '.js', '.json', '.tsx', '.jsx'],
    modules: ['node_modules', resolve(__dirname, '../src/')],
    alias: {
      '@': resolve(__dirname, '../src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        include: [resolve(__dirname, '../src/')],
        use: 'ts-loader',
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { filename: '[name].[ext]' },
          },
          { loader: 'css-loader', options: {} },
          {
            loader: 'less-loader',
            options: {
              lessOptions: { javascriptEnabled: true },
            },
          },
        ],
      },
      {
        oneOf: [
          {
            test: /\.png|jpe?g|webp|gif$/,
            loader: 'url-loader',
            options: { limit: 8192 },
          },
          { test: /\.png|jpe?g|webp|gif$/, loader: 'file-loader' },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HTMLWebpackPlugin({
      template: resolve(__dirname, '../src/render/template/index.html'),
      filename: 'index.html',
      inject: true,
      hash: true,
    }),
  ],
};
