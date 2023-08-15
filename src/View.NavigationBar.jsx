
import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { IconButton } from '@mui/material'
import { Tooltip } from '@mui/material'
import { Button } from '@mui/material'
import { Grid } from '@mui/material'
import { Paper } from '@mui/material'
import { Card } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogTitle } from '@mui/material'
import { DialogContent } from '@mui/material'
import { DialogActions } from '@mui/material'
import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemIcon } from '@mui/material'
import { ListItemText } from '@mui/material'
import { ListItemButton } from '@mui/material'
import { Switch } from '@mui/material'
import { TextField } from '@mui/material'

import SaveIcon from '@mui/icons-material/Save'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode'
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff'
import AirplayIcon from '@mui/icons-material/Airplay'

import Imitation, { initState } from './utils.imitation'
import { GraphElement, GraphExample } from './utils.package'
import { downloadFile, baseIp, hash } from './utils.common'
import { TooltipSX, TextFieldSX } from './utils.mui.sx'

const elementOrigin = (content, list = []) => {
  content.forEach(i => {
    if (!list.includes(i.license)) list.push(i.license)

    if (i.children) {
      Object.values(i.children).forEach(i => elementOrigin(i, list))
    }
  })

  return list
}

const styleToClass = (html) => {
  const styleMap = html
    .match(/style=".+?"/g)
    .map(i => i.replace('style="', '')
      .replace('"', ''))
    .reduce((t, i) => {
      if (t.find(i_ => i_.style === i)) {
        return t
      } else {
        const item = { style: i, class: 'S' + Array.from(Array(6), () => Math.floor(Math.random() * 36).toString(36)).join('').toUpperCase() }

        t.push(item)

        return t
      }
    }, [])

  const linkStyle = styleMap.map(i => {
    return `.${i.class}{${i.style}}`
  }).join('')

  var r = html

  r = r.replace('</head>', `<style id="prerender.style">${linkStyle}</style></head>`)

  styleMap.forEach(i => {
    while (r.includes(`style="${i.style}"`)) {
      r = r.replace(`style="${i.style}"`, `class="${i.class}"`)
    }
  })

  return r
}

const simpleify = (content) => {
  const data = JSON.parse(JSON.stringify(content))

  const array = []

  const find = (item) => {
    if (item && typeof item === 'object') {
      if (Array.isArray(item)) {
        item.forEach(i => find(i))
      } else {
        Object.entries(item).forEach(i => {
          const [k, v] = i
          if (!array.includes(k)) array.push(k)
          find(v)
        })
      }
    }
  }

  find(data)

  const map = {}
  const map_ = {}
  array.forEach((i, index) => {
    map[i] = i[0] + index
    map_[i[0] + index] = i
  })

  const rename = (item, map) => {
    if (item && typeof item === 'object') {
      if (Array.isArray(item)) {
        item.forEach(i => rename(i, map))
      } else {
        Object.entries(item).forEach(i => {
          const [k, v] = i
          rename(v, map)
          if (map[k]) {
            item[map[k]] = item[k]
            delete item[k]
          }
        })
      }
    }
  }

  rename(data, map)

  return { data, map: map_ }
}

const resumeify = (content, map) => {
  const data = JSON.parse(JSON.stringify(content))

  const rename = (item, map) => {
    if (item && typeof item === 'object') {
      if (Array.isArray(item)) {
        item.forEach(i => rename(i, map))
      } else {
        Object.entries(item).forEach(i => {
          const [k, v] = i
          rename(v, map)
          if (map[k]) {
            item[map[k]] = item[k]
            delete item[k]
          }
        })
      }
    }
  }

  rename(data, map)

  return data
}

const resumeifyString = "function(content, map) { const data = JSON.parse(JSON.stringify(content)); const rename = (item, map) => { if (item && typeof item === 'object') { if (Array.isArray(item)) { item.forEach(i => rename(i, map)) } else {Object.entries(item).forEach(i => { const [k, v] = i; rename(v, map); if (map[k]) { item[map[k]] = item[k]; delete item[k] } }) } } }; rename(data, map); return data }"

function DialogPublish(props) {
  const { onClose, graphRef } = props

  const [option, setOption] = React.useState({ prerender: false, static: false, spilt: false, inline: false, simple: false, onescript: false, sourceOrigin: Imitation.state.graphConfig.project.sourceOrigin })

  const handlePublish = async () => {
    const data = graphRef.current.getData()

    var html = await fetch(`${option.sourceOrigin}/html/index.html`).then(res => res.text())

    var render = await fetch(`${option.sourceOrigin}/render/index.js`).then(res => res.text())

    // var element = await fetch(`${option.sourceOrigin}/element-collection/index.js`).then(res => res.text())

    var element = await Promise.all(elementOrigin(data.graphContent).map(i => new Promise((resolve) => fetch(`${option.sourceOrigin}/element/${i}.js`).then(res => resolve(res.text()))))).then(res => res.join(''))

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

  return <Dialog open={true} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 720 } }} onClose={onClose} className='font'>
    <DialogTitle style={{ fontSize: 14, fontWeight: 'bold' }}>publish config</DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, fontWeight: 'bold' }}>
            <div>Prerender</div>
            <div><Switch checked={option['prerender']} onChange={e => setOption(pre => Object.assign(pre, { ['prerender']: e.target.checked }))}></Switch></div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, fontWeight: 'bold' }}>
            <div>Static</div>
            <div><Switch checked={option['static']} onChange={e => setOption(pre => Object.assign(pre, { ['static']: e.target.checked }))}></Switch></div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, fontWeight: 'bold' }}>
            <div>Inline</div>
            <div><Switch checked={option['inline']} onChange={e => setOption(pre => Object.assign(pre, { ['inline']: e.target.checked }))}></Switch></div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, fontWeight: 'bold' }}>
            <div>Simple data</div>
            <div><Switch checked={option['simple']} onChange={e => setOption(pre => Object.assign(pre, { ['simple']: e.target.checked }))}></Switch></div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, fontWeight: 'bold' }}>
            <div>Spilt file</div>
            <div><Switch checked={option['spilt']} onChange={e => setOption(pre => Object.assign(pre, { ['spilt']: e.target.checked }))}></Switch></div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, fontWeight: 'bold' }}>
            <div>One script</div>
            <div><Switch checked={option['onescript']} onChange={e => setOption(pre => Object.assign(pre, { ['onescript']: e.target.checked }))}></Switch></div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <TextField {...TextFieldSX} fullWidth label='Source Origin' autoComplete='off' value={option['sourceOrigin']} onChange={e => setOption(pre => Object.assign(pre, { ['sourceOrigin']: e.target.value }))} />
        </Grid>
      </Grid>
    </DialogContent>

    <DialogActions>
      <Button variant='contained' onClick={handlePublish}>Publish</Button>
    </DialogActions>
  </Dialog>
}

function App() {
  const [dialogPublish, setDialogPublish] = React.useState()

  const handleSave = () => {
    localStorage.setItem('graphCache', JSON.stringify({ graphContent: Imitation.state.graphContent, graphConfig: Imitation.state.graphConfig }))
    Imitation.assignState({ message: 'Save Success' })
  }

  const handleClear = () => {
    initState()
    Imitation.assignState({ essage: 'Clear Success', graphElement: GraphElement, graphElementUpdate: hash(), graphContentUpdate: hash() })
  }

  return <Paper style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8, position: 'relative' }} className='font'>
    <div>
      <Grid item>
        <Button style={{ textTransform: 'none' }} color='inherit'>GRAPHOR</Button>
      </Grid>
    </div>
    <div>
      <Tooltip {...TooltipSX} title='Save'>
        <IconButton style={{ marginLeft: 4 }} onClick={handleSave}><SaveIcon /></IconButton>
      </Tooltip>
      <Tooltip {...TooltipSX} title='Clear'>
        <IconButton style={{ marginLeft: 4 }} onClick={handleClear}><ClearAllIcon /></IconButton>
      </Tooltip>
      <Tooltip {...TooltipSX} title='Preview'>
        <IconButton style={{ marginLeft: 4 }} onClick={() => window.open(location.origin + location.pathname + '#/prod')}><DeveloperModeIcon /></IconButton>
      </Tooltip>
      <Tooltip {...TooltipSX} title='Publish'>
        <IconButton style={{ marginLeft: 4 }} onClick={() => setDialogPublish(true)}><DataSaverOffIcon /></IconButton>
      </Tooltip>
    </div>

    {
      dialogPublish ? <DialogPublish onClose={() => setDialogPublish()} /> : null
    }

  </Paper>
}

export default Imitation.withBindRender(App, state => [state.graphElementUpdate, state.graphContentUpdate, state.graphConfigUpdate])