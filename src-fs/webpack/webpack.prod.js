const webpack = require('webpack')
const path = require('path')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = Object.assign({}, common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin({ currentAssets: [] }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../static/prod.html')
    }),
    new webpack.DefinePlugin({ process: { env: JSON.stringify('prod') } }),
    // new BundleAnalyzerPlugin()
  ],
  optimization: {
    minimize: true,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
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