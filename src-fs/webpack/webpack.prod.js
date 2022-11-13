const webpack = require('webpack')
const path = require('path')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = Object.assign({}, common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({
      currentAssets: []
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './webpack.prod.html')
    }),
    new webpack.DefinePlugin({ process: { env: JSON.stringify('prod') } }),
  ],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    'react-ace': 'ReactAce',
    '@mui/material': 'MaterialUI',
    'axios': 'axios'
  }
})