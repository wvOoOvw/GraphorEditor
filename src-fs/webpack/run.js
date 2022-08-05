const webpack = require('webpack')
const open = require('open')
const fs = require('fs')

if (process.argv.includes('--dev')) {
  const webpackConfig = require('./webpack.dev')
  const compiler = webpack(webpackConfig)

  const serverConfig = { port: 8000 }
  if (process.argv.filter(i => i.includes('port'))[0]) serverConfig.port = process.argv.filter(i => i.includes('port'))[0].split('=')[1]

  const WebpackDevServer = require('webpack-dev-server')
  const app = new WebpackDevServer(serverConfig, compiler)
  app.start().then(err => {
    if (err) throw err
    open('http://localhost:' + serverConfig.port)
  })
}

if (process.argv.includes('--prod')) {
  const webpackConfig = require('./webpack.prod')

  webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    console.log(stats.toString({ colors: true, modules: true, children: true, chunks: true, chunkModules: true }))
  })
}

if (process.argv.includes('--simple')) {
  const webpackConfig = require('./webpack.prod')

  webpackConfig.output.filename = 'index.js'
  webpackConfig.optimization = { minimize: true }

  webpack(webpackConfig, (err, stats) => {
    if (err) throw err
    console.log(stats.toString({ colors: true, modules: true, children: true, chunks: true, chunkModules: true }))

    const jsContent = fs.readFileSync(webpackConfig.output.path + '/index.js').toString().replace('/*! For license information please see index.js.LICENSE.txt */\n', '')
    const htmlContent = fs.readFileSync(webpackConfig.output.path + '/index.html').toString()

    const htmlContent_ = htmlContent
      .replace('<script defer="defer" src="index.js"></script>', '')
      + '<script>'
      + jsContent
      + '</script >'

    fs.writeFileSync(webpackConfig.output.path + '/index.html', htmlContent_)
    fs.unlinkSync(webpackConfig.output.path + '/index.js')
    fs.unlinkSync(webpackConfig.output.path + '/index.js.LICENSE.txt')
  })
}