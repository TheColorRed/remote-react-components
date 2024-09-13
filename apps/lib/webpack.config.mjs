// const path = require('path');
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

/** @type {import('webpack').Configuration} */
export default {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: false,
  output: {
    path: path.resolve(__dirname, '../../dist/console'),
    filename: 'common.js',
    library: {
      type: 'module',
    },
  },
  resolve: {
    alias: {
      '@ecp/rtc': path.resolve(__dirname, '../../src'),
    },
  },
  experiments: {
    outputModule: true,
  },
};
