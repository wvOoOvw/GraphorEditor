const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../build')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-runtime']
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          },
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|mp3|m4a|wav)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static'
            }
          }
        ]
      },
    ]
  }
}