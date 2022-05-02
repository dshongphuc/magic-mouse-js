const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',    
  entry: {
    index: './src/js/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,    
  },
  optimization: {
    runtimeChunk: 'single'
  },
  watch: true,
  plugins: [    
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),    
    new MiniCssExtractPlugin(),    
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // clean: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',          
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'sass-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(html)$/,
        use: ['html-loader']
      }
    ],
  },  
  
};