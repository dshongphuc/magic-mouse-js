const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',    
  entry: {
    magicmouse: './src/js/magicmouse.js',
  },
  plugins: [     
    new MiniCssExtractPlugin(),    
  ],
  output: {
    filename: '[name].cdn.min.js',
    path: path.resolve(__dirname, 'built'),
    library: {
      name: 'magicMouse',
      type: 'var',
      export: 'magicMouse',
    },
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