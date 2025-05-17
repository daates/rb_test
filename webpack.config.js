const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
    // publicPath: './'
  },
  module: {
    rules: [
      {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['transform-remove-console']
        }
      }
    },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader', 
          'sass-loader' 
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' 
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public', to: '' }
      ],
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
    open: true
  },
  mode: 'development'
};
