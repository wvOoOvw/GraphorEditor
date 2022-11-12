import React from 'react'

import { Button } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogContent } from '@mui/material'
import { DialogActions } from '@mui/material'
import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemIcon } from '@mui/material'
import { ListItemText } from '@mui/material'
import { ListItemButton } from '@mui/material'
import { Switch } from '@mui/material'

import axios, { baseIp } from '../utils/axios'
import { downloadFile } from '../utils/common'
import { simpleify, resumeifyString, styleToClass, elementOrigin } from '../utils/publish'

function App(props) {
  const { onClose, graphRef } = props

  const [option, setOption] = React.useState({ prerender: false, static: false, spilt: false, inline: false, simple: false, onescript: false })

  const handlePublish = async () => {
    const data = graphRef.current.getData()

    var html = await fetch(baseIp + '/graph/publish/html/index.html').then(res => res.text())

    var render = await fetch(baseIp + '/graph/publish/render/index.js').then(res => res.text())

    // var element = await fetch(baseIp + '/graph/publish/element-collection/index.js').then(res => res.text())

    var element = await Promise.all(elementOrigin(data.graphContent).map(i => new Promise((resolve) => fetch(baseIp + `/graph/publish/element/${i}.js`).then(res => resolve(res.text()))))).then(res => res.join(''))

    html = html
      .replace(
        `<replace id="document.title"></replace>`,
        `<title id="document.title">${data.graphConfig.document.title}</title>`
      )
      .replace(
        `<replace id="document.icon"></replace>`,
        `<link id="document.icon" rel="icon" href="${data.graphConfig.document.icon}"/>`
      )
      .replace(
        `<replace id="document.viewport"></replace>`,
        `<meta id="document.viewport" name="viewport" content="${data.graphConfig.document.viewport}" />`
      )
      .replace(
        `<replace id="project.renderId"></replace>`,
        `<div id="${data.graphConfig.project.renderId}"></div>`
      )
      .replace(
        `<replace id="graph.data"></replace>`,
        `<script id="graph.data">window.graphContent = ${JSON.stringify(data.graphContent)}; window.graphConfig = ${JSON.stringify(data.graphConfig)};</script>`
      )
      .replace(
        `<replace id="graph.element"></replace>`,
        `<script id="graph.element">${element}</script>`
      )
      .replace(
        `<replace id="graph.render"></replace>`,
        `<script id="graph.render">${render}</script>`
      )

    if (option.simple) {
      const graphContent = data.graphContent
      const graphConfig = data.graphConfig

      const simpleContent = simpleify(graphContent)
      const simpleConfig = simpleify(graphConfig)

      html = html.replace(
        /<script id="graph.data">.+?<\/script>/,
        `<script id="graph.data">window.graphContent = (${resumeifyString}(${JSON.stringify(simpleContent.data)}, ${JSON.stringify(simpleContent.map)})); window.graphConfig = (${resumeifyString}(${JSON.stringify(simpleConfig.data)}, ${JSON.stringify(simpleConfig.map)}));</script>`
      )
    }

    if (option.onescript) {
      const content = html
        .match(/<script id="graph.data">.+?<\/script>/)[0]
        .replace('<script id="graph.data">', '')
        .replace('</script>', '')

      const element = html
        .match(/<script id="graph.element">.+?<\/script>/)[0]
        .replace('<script id="graph.element">', '')
        .replace('</script>', '')

      const render = html.match(/<script id="graph.render">.+?<\/script>/)[0]
        .replace('<script id="graph.render">', '')
        .replace('</script>', '')

      html = html
        .replace(
          /<script id="graph.data">.+?<\/script>/,
          ''
        )
        .replace(
          /<script id="graph.element">.+?<\/script>/,
          ''
        )
        .replace(
          /<script id="graph.render">.+?<\/script>/,
          `<script id="graph.index">${content} ${element} ${render}</script>`,
        )
    }

    if (option.prerender) {
      const prerenderRes = await axios.post('/prerender', { data: html })

      html = prerenderRes.data
    }

    if (option.static) {
      html = html.replace(/<script.+?<\/script>/g, '')
    }

    if (option.inline) {
      html = styleToClass(html)
    }

    if (option.spilt) {
      if (html.match(/<script id="graph.index">.+?<\/script>/)) {
        const index = html.match(/<script id="graph.index">.+?<\/script>/)[0]
          .replace('<script id="graph.index">', '')
          .replace('</script>', '')
        html = html
          .replace(
            /<script id="graph.index">.+?<\/script>/,
            `<script id="graph.index" src="./index.js"></script>`,
          )
        downloadFile('index.js', index)
      }
      if (html.match(/<script id="graph.data">.+?<\/script>/)) {
        const data = html.match(/<script id="graph.data">.+?<\/script>/)[0]
          .replace('<script id="graph.data">', '')
          .replace('</script>', '')
        html = html
          .replace(
            /<script id="graph.data">.+?<\/script>/,
            `<script id="graph.data" src="./data.js"></script>`,
          )
        downloadFile('data.js', data)
      }
      if (html.match(/<script id="graph.element">.+?<\/script>/)) {
        const element = html.match(/<script id="graph.element">.+?<\/script>/)[0]
          .replace('<script id="graph.element">', '')
          .replace('</script>', '')
        html = html
          .replace(
            /<script id="graph.element">.+?<\/script>/,
            `<script id="graph.element" src="./element.js"></script>`,
          )
        downloadFile('element.js', element)
      }
      if (html.match(/<script id="graph.render">.+?<\/script>/)) {
        const render = html.match(/<script id="graph.render">.+?<\/script>/)[0]
          .replace('<script id="graph.render">', '')
          .replace('</script>', '')
        html = html
          .replace(
            /<script id="graph.render">.+?<\/script>/,
            `<script id="graph.render" src="./render.js"></script>`,
          )
        downloadFile('render.js', render)
      }
      if (html.match(/<style id="prerender.style">.+?<\/style>/)) {
        const css = html.match(/<style id="prerender.style">.+?<\/style>/)[0]
          .replace('<style id="prerender.style">', '')
          .replace('</style>', '')

        html = html.replace(
          /<style id="prerender.style">.+?<\/style>/,
          '<link rel="stylesheet" type="text/css" href="./index.css"></link>'
        )
        downloadFile('index.css', css)
      }
    }

    downloadFile('index.html', html)
  }

  const switchActions = [
    { name: '预渲染', value: 'prerender' },
    { name: '静态', value: 'static' },
    { name: '行内样式', value: 'inline' },
    { name: '压缩数据', value: 'simple' },
    { name: '文件分离', value: 'spilt' },
    { name: '唯一脚本', value: 'onescript' },
  ]

  return <Dialog open={true} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '720px' } }} onClose={onClose}>
    <DialogContent dividers>
      <List>
        {
          switchActions.map(i => {
            return <ListItem>
              <ListItemButton>
                <ListItemText sx={{ '& .MuiTypography-root': { fontWeight: 'bold' } }}>{i.name}</ListItemText>
                <ListItemIcon>
                  <Switch checked={option[i.value]} onChange={e => setOption(pre => Object.assign(pre, { [i.value]: e.target.checked }))}></Switch>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          })
        }
      </List>
    </DialogContent>

    <DialogActions>
      <Button variant='contained' onClick={handlePublish}>发布</Button>
    </DialogActions>
  </Dialog>
}

export default App