
import React from 'react'

import { Tooltip } from '@mui/material'
import { Button } from '@mui/material'
import { Grid } from '@mui/material'
import { Paper } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogTitle } from '@mui/material'
import { DialogContent } from '@mui/material'
import { DialogActions } from '@mui/material'
import { Switch } from '@mui/material'
import { TextField } from '@mui/material'

import SaveIcon from '@mui/icons-material/Save'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode'
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff'
import GitHubIcon from '@mui/icons-material/GitHub'
import BookIcon from '@mui/icons-material/Book'

import GraphElement from '../src-element/index'

import example from '../src-example/index'

import Imitation, { initState } from './utils.imitation'
import { downloadFile, hash } from './utils.common'
import { TooltipSX, TextFieldSX } from './utils.mui.sx'

const getLicenseAll = (content) => {
  const list = []

  content.forEach(i => {
    if (!list.includes(i.license)) list.push(i.license)

    if (i.children) {
      Object.values(i.children).forEach(i => list.push(...getLicenseAll(i)))
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

const encodeify = (content) => {
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

const decodeify = (content, map) => {
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

const decodeifyString = "function(content, map) { const data = JSON.parse(JSON.stringify(content)); const rename = (item, map) => { if (item && typeof item === 'object') { if (Array.isArray(item)) { item.forEach(i => rename(i, map)) } else {Object.entries(item).forEach(i => { const [k, v] = i; rename(v, map); if (map[k]) { item[map[k]] = item[k]; delete item[k] } }) } } }; rename(data, map); return data }"

function DialogPublish(props) {
  const { onClose } = props

  const [option, setOption] = React.useState({ spilt: false, encode: false, onescript: false, sourceOrigin: Imitation.state.graphConfig.project.sourceOrigin })

  const handlePublish = async () => {
    const data = { graphContent: Imitation.state.graphContent, graphConfig: Imitation.state.graphConfig }

    var html = await fetch(`${option.sourceOrigin}/html/index.html`).then(res => res.text())

    var render = await fetch(`${option.sourceOrigin}/render/index.js`).then(res => res.text())

    var element = await Promise.all(getLicenseAll(data.graphContent).map(i => new Promise((resolve) => fetch(`${option.sourceOrigin}/element/${i}.js`).then(res => resolve(res.text()))))).then(res => res.join(''))

    const loadDependencies = () => {
      const dependencies = { ...Imitation.state.graphConfig.dependenciesMap }

      const r = []

      Object.entries(dependencies).forEach(i => {
        const [key, value] = i
        if (value.match(/.js$/)) r.push(`<script id="document.dependencies.${key}" src=${value}></script>`)
        if (value.match(/.css$/)) r.push(`<link id="document.dependencies.${key}" rel="stylesheet" href=${value}></link>`)
      })

      return r.join('')
    }

    const dependencies = loadDependencies()

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
        `<replace id="document.dependencies"></replace>`,
        dependencies
      )
      .replace(
        `<replace id="project.renderId"></replace>`,
        `<div id="${data.graphConfig.project.renderId}"></div>`
      )
      .replace(
        `<replace id="graph.data"></replace>`,
        `<script id="graph.data">window.graphContent = ${JSON.stringify(data.graphContent)};</script>`
      )
      .replace(
        `<replace id="graph.element"></replace>`,
        `<script id="graph.element">${element}</script>`
      )
      .replace(
        `<replace id="graph.render"></replace>`,
        `<script id="graph.render">${render}</script>`
      )

    if (option.encode) {
      const graphContent = data.graphContent

      const encodeContent = encodeify(graphContent)

      html = html.replace(
        /<script id="graph.data">.+?<\/script>/,
        `<script id="graph.data">window.graphContent = (${decodeifyString}(${JSON.stringify(encodeContent.data)}, ${JSON.stringify(encodeContent.map)}));</script>`
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
    <DialogTitle style={{ fontSize: 14, fontWeight: 'bold' }}>Publish Config</DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Source Origin' value={option['sourceOrigin']} onChange={e => setOption(pre => Object.assign({}, pre, { ['sourceOrigin']: e.target.value }))} />
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, fontWeight: 'bold' }}>
            <div>Encode</div>
            <div><Switch checked={option['encode']} onChange={e => setOption(pre => Object.assign({}, pre, { ['encode']: e.target.checked }))}></Switch></div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, fontWeight: 'bold' }}>
            <div>Spilt File</div>
            <div><Switch checked={option['spilt']} onChange={e => setOption(pre => Object.assign({}, pre, { ['spilt']: e.target.checked }))}></Switch></div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, fontWeight: 'bold' }}>
            <div>One Script</div>
            <div><Switch checked={option['onescript']} onChange={e => setOption(pre => Object.assign({}, pre, { ['onescript']: e.target.checked }))}></Switch></div>
          </div>
        </Grid>
      </Grid>
    </DialogContent>

    <DialogActions>
      <Button variant='contained' onClick={handlePublish}>Publish</Button>
    </DialogActions>
  </Dialog>
}

function DialogDocument(props) {
  const { onClose } = props

  return <Dialog open={true} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 1080 } }} onClose={onClose} className='font'>
    <DialogTitle style={{ fontSize: 14, fontWeight: 'bold' }}>Document</DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={1}>

      </Grid>
    </DialogContent>
  </Dialog>
}

function DialogExample(props) {
  const { onClose } = props

  const use = async (example) => {
    Imitation.state.loading = Imitation.state.loading + 1

    Imitation.dispatch()

    const guide = await example.value().then(res => res.default)

    Imitation.state.graphContent = guide.graphContent
    Imitation.state.graphEvent = guide.graphEvent
    Imitation.state.graphConfig = guide.graphConfig
    Imitation.state.graphContentUpdate = hash()
    Imitation.state.graphEventUpdate = hash()
    Imitation.state.graphConfigUpdate = hash()

    Imitation.state.loading = Imitation.state.loading - 1

    Imitation.dispatch()

    onClose()
  }

  return <Dialog open={true} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: 840 } }} onClose={onClose} className='font'>
    <DialogTitle style={{ fontSize: 14, fontWeight: 'bold' }}>Example</DialogTitle>
    <DialogContent dividers>
      <Grid container spacing={1}>

        {
          example.map((i, index) => {
            return <Grid key={index} xs={12}>
              <Button fullWidth variant='contained' onClick={() => use(i)}>{i.label}</Button>
            </Grid>
          })
        }

      </Grid>
    </DialogContent>
  </Dialog>
}

function App() {
  const [dialogPublish, setDialogPublish] = React.useState()
  const [dialogDocument, setDialogDocument] = React.useState()
  const [dialogExample, setDialogExample] = React.useState()

  const handleSave = () => {
    localStorage.setItem('graphCache', JSON.stringify({ graphContent: Imitation.state.graphContent, graphEvent: Imitation.state.graphEvent, graphConfig: Imitation.state.graphConfig }))
    Imitation.assignState({ message: 'Save Success' })
  }

  const handleClear = () => {
    initState()
    Imitation.assignState({ message: 'Clear Success', graphElement: GraphElement, graphElementUpdate: hash(), graphContentUpdate: hash() })
  }

  const handlePreview = () => {
    localStorage.setItem('graphCache', JSON.stringify({ graphContent: Imitation.state.graphContent, graphEvent: Imitation.state.graphEvent, graphConfig: Imitation.state.graphConfig }))
    window.open(location.origin + location.pathname + '#/prod')
  }

  const handleGuide = async () => {
    Imitation.state.loading = Imitation.state.loading + 1

    Imitation.dispatch()

    const guide = await example.find(i => i.label === 'Guide').value().then(res => res.default)

    Imitation.state.graphContent = guide.graphContent
    Imitation.state.graphEvent = guide.graphEvent
    Imitation.state.graphConfig = guide.graphConfig
    Imitation.state.graphContentUpdate = hash()
    Imitation.state.graphEventUpdate = hash()
    Imitation.state.graphConfigUpdate = hash()

    Imitation.state.loading = Imitation.state.loading - 1

    Imitation.dispatch()
  }

  return <Paper style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8, position: 'relative' }} className='font'>
    <div>
      <Grid item>
        <Button style={{ textTransform: 'none', marginRight: 8 }} color='inherit'>GRAPHOR</Button>
        <Button style={{ textTransform: 'none', marginRight: 8 }} variant='outlined' onClick={() => handleGuide()}>Guide</Button>
      </Grid>
    </div>
    <div>

      <Tooltip {...TooltipSX} title='GitHub'>
        <Button style={{ marginLeft: 8 }} variant='outlined' onClick={() => window.open('https://github.com/github-magneto/project-graph')}><GitHubIcon /></Button>
      </Tooltip>
      <Tooltip {...TooltipSX} title='Example'>
        <Button style={{ marginLeft: 8 }} variant='outlined' onClick={() => setDialogExample(true)}><BookIcon /></Button>
      </Tooltip>
      <Tooltip {...TooltipSX} title='Save'>
        <Button style={{ marginLeft: 8 }} variant='outlined' onClick={handleSave}><SaveIcon /></Button>
      </Tooltip>
      <Tooltip {...TooltipSX} title='Clear'>
        <Button style={{ marginLeft: 8 }} variant='outlined' onClick={handleClear}><ClearAllIcon /></Button>
      </Tooltip>
      <Tooltip {...TooltipSX} title='Preview'>
        <Button style={{ marginLeft: 8 }} variant='outlined' onClick={handlePreview}><DeveloperModeIcon /></Button>
      </Tooltip>
      <Tooltip {...TooltipSX} title='Publish'>
        <Button style={{ marginLeft: 8 }} variant='outlined' onClick={() => setDialogPublish(true)}><DataSaverOffIcon /></Button>
      </Tooltip>
    </div>

    {
      dialogDocument ? <DialogDocument onClose={() => setDialogDocument()} /> : null
    }

    {
      dialogPublish ? <DialogPublish onClose={() => setDialogPublish()} /> : null
    }

    {
      dialogExample ? <DialogExample onClose={() => setDialogExample()} /> : null
    }

  </Paper>
}

export default Imitation.withBindRender(App, state => [state.graphElementUpdate, state.graphContentUpdate, state.graphConfigUpdate])