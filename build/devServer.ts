const path = require('path');

module.exports = {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  hot: true,
  open: false,
  port: 8080,
  noInfo: false,
  quiet: true,
  proxy: {},
  watchContentBase: true,
  watchOptions: {
    ignored: /node_modules/,
  },
};
