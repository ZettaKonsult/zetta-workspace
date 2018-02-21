var slsw = require('serverless-webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  // Generate sourcemaps for proper error messages
  devtool: 'source-map',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['env', { targets: { node: '6.10.3' } }]],
          },
        },
        include: __dirname,
        exclude: /node_modules/,
      },
    ],
  },
};
