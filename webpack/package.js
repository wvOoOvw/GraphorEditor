const webpack = require('webpack')
const path = require('path')
const fs = require('fs')

const webpackConfig = {
  mode: 'production',
  entry: path.join(__dirname, `./index.js`),
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
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: ['file-loader']
      },
    ]
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM',
    'react-ace': 'ReactAce',
    '@mui/material': 'MaterialUI',
    'hls.js': 'Hls'
  }
}

const deleteDeepDirectory = (path) => {
  if (!fs.existsSync(path)) {
    return
  }
  if (fs.lstatSync(path).isFile()) {
    fs.unlinkSync(path)
    return
  }
  if (fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach(i => deleteDeepDirectory(path + '/' + i))
    fs.rmdirSync(path)
    return
  }
}

const element = async () => {
  const webpackConfig_ = (name) => {
    return Object.assign({}, webpackConfig, {
      output: {
        libraryTarget: 'umd',
        filename: `${name}.js`,
        path: path.join(__dirname, '../build-package/element')
      }
    })
  }

  const dir = fs.readdirSync(path.join(__dirname, `../src-element`)).filter(i => i !== '.DS_Store' && i !== 'index.js')

  const output = (name) => `
    import Render from '../src-element/${name}/Render.jsx'; 
    import license from '../src-element/${name}/license.js'; 

    const item = { Render, license }; 
    
    window.graphElement = window.graphElement ? [...window.graphElement, item] : [item];
  `

  for (let index = 0; index < dir.length; index++) {
    const item = dir[index]

    fs.writeFileSync(path.join(__dirname, './index.js'), output(item))

    await new Promise((resolve) => webpack(webpackConfig_(item), resolve))
  }

  fs.unlinkSync(path.join(__dirname, `./index.js`))
}

const elements = async () => {
  const webpackConfig_ = Object.assign({}, webpackConfig, {
    entry: path.resolve(__dirname, './index.js'),
    output: {
      library: 'graphElement',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: 'index.js',
      path: path.join(__dirname, '../build-package/element')
    }
  })

  const dir = fs.readdirSync(path.join(__dirname, `../src-element`)).filter(i => i !== '.DS_Store' && i !== 'index.js')

  const output = `
    const list = [];

    ${dir.map(i => { const name = i.replace('-', ''); return `import ${name}Render from '../src-element/${i}/Render.jsx'; import ${name}license from '../src-element/${i}/license.js'; list.push({ Render: ${name}Render, license: ${name}license}); ` }).join('')}

    export default list;
  `

  fs.writeFileSync(path.join(__dirname, './index.js'), output)

  await new Promise((resolve) => webpack(webpackConfig_, resolve))

  fs.unlinkSync(path.join(__dirname, `./index.js`))
}

const render = async () => {
  const webpackConfig_ = Object.assign({}, webpackConfig, {
    entry: path.resolve(__dirname, './index.js'),
    output: {
      libraryTarget: 'umd',
      filename: 'index.js',
      path: path.resolve(__dirname, '../build-package/render')
    }
  })

  const output = `
    import GraphProd from '../src/View.Graph.Prod'

    ReactDOM.render(<GraphProd />, document.getElementById(window.graphConfig.project.renderId))
  `

  fs.writeFileSync(path.join(__dirname, './index.js'), output)

  await new Promise((resolve) => webpack(webpackConfig_, resolve))

  fs.unlinkSync(path.join(__dirname, `./index.js`))
}

const html = async () => {
  const h = `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="utf-8" />
    <replace id="document.title"></replace>
    <replace id="document.icon"></replace>
    <replace id="document.viewport"></replace>
    <replace id="document.dependencies"></replace>
  </head>

  <body style="margin: 0; padding: 0;">
    <replace id="project.renderId"></replace>
  </body>
  <replace id="graph.data"></replace>
  <replace id="graph.element"></replace>
  <replace id="graph.render"></replace>

  </html>
  `

  fs.writeFileSync(path.join(__dirname, '../build-package/html/index.html'), h.replace(/\>[\r\n\s]+\</g, '><'))
}

const run = async () => {
  deleteDeepDirectory(path.join(__dirname, '../build-package'))

  fs.mkdirSync(path.join(__dirname, '../build-package'))
  fs.mkdirSync(path.join(__dirname, '../build-package/element'))
  fs.mkdirSync(path.join(__dirname, '../build-package/render'))
  fs.mkdirSync(path.join(__dirname, '../build-package/html'))

  await element()
  await elements()
  await render()
  await html()
}

module.exports = run