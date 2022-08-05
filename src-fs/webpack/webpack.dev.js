const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = Object.assign({}, common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../static/dev.html')
    }),
    new webpack.DefinePlugin({ process: { env: JSON.stringify('dev') } })
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