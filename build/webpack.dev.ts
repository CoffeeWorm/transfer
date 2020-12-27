const { merge } = require('webpack-merge');
const baseConf = require('./webpack.config');
const devServer = require('./devServer');
const FriendlyErrorPlugin = require('friendly-errors-webpack-plugin');

const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');

const devConfig = {
  plugins: [
    new HotModuleReplacementPlugin(),
    new DefinePlugin({}),
    new FriendlyErrorPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:3000'],
        notes: [
          'Some additionnal notes to be displayed unpon successful compilation',
        ],
      },
      clearConsole: true,
    }),
  ],
  devServer,
};

module.exports = merge(baseConf, devConfig);
