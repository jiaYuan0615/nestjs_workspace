const webpack = require('webpack');
const { join, resolve } = require('path');
const nodeExternals = require('webpack-node-externals');
require('dotenv').config({ path: resolve(__dirname, '../../.env.ecommerce') })
const mode = process.env.APP_ENV
module.exports = {
  entry: ['webpack/hot/poll?100', resolve(__dirname, './src/main.ts')],
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new RunScriptWebpackPlugin({ name: 'main.js', autoRestart: false }),
  ],
  output: {
    path: join(__dirname, 'dist'),
    filename: 'main.js',
  },
};