const path = require('path');

module.exports = {
  entry: './app/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
