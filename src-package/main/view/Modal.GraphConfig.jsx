import React from 'react'

import { Grid } from '@mui/material'
import { Slider } from '@mui/material'
import { Divider } from '@mui/material'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import { IconButton } from '@mui/material'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import Imitation from '../utils/imitation'
import { hash, copy, deepCopyElement } from '../utils/common'

import AccordionS from './Component.Accordion'
import { CodeModal } from './Component.Code'

function Screen(props) {
  const { handleChange } = props

  return <Grid item xs={12}>
    <AccordionS defaultExpanded={true} title='开发场景配置'>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField fullWidth value={Imitation.state.graphConfig.screen.width} label='宽度' onChange={e => handleChange(() => Imitation.state.graphConfig.screen.width = e.target.value)} type='number' />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth value={Imitation.state.graphConfig.screen.height} label='高度' onChange={e => handleChange(() => Imitation.state.graphConfig.screen.height = e.target.value)} type='number' />
        </Grid>
        <Grid item xs={12}>
          <Button variant='outlined' fullWidth onClick={e => handleChange(() => { Imitation.state.graphConfig.screen.width = 375; Imitation.state.graphConfig.screen.height = 667; })}>标准手机尺寸</Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant='outlined' fullWidth onClick={e => handleChange(() => { Imitation.state.graphConfig.screen.width = 1200; Imitation.state.graphConfig.screen.height = 720; })}>标准电脑尺寸</Button>
        </Grid>
        <Grid item xs={12}>
          <div>缩放</div>
          <Slider value={Imitation.state.graphConfig.screen.scale} onChange={(e, v) => handleChange(() => Imitation.state.graphConfig.screen.scale = v)} min={0} max={2} step={0.01} valueLabelDisplay='auto' />
        </Grid>
        <Grid item xs={12}>
          <Button variant='outlined' fullWidth onClick={e => handleChange(() => { Imitation.state.graphConfig.screen.translateX = 0; Imitation.state.graphConfig.screen.translateY = 0; })}>位置复原</Button>
        </Grid>
      </Grid>
    </AccordionS>
  </Grid>
}

function DependenciesMap(props) {
  const { handleChange } = props

  const handleDelete = key => {
    handleChange(() => { delete Imitation.state.graphConfig.dependenciesMap[key] })
  }

  const [name, setName] = React.useState('')
  const handleAdd = () => {
    if (name && !Imitation.state.graphConfig.dependenciesMap[name]) {
      handleChange(() => { Imitation.state.graphConfig.dependenciesMap[name] = '' })
      setName('')
    }
  }

  return <Grid item xs={12}>
    <AccordionS defaultExpanded={false} title='依赖映射'>
      <Grid container spacing={2}>
        {
          Object.entries(Imitation.state.graphConfig.dependenciesMap).map((i) => {
            return <Grid item xs={12} key={i[0]}>
              <Grid container spacing={1} alignItems='center'>
                <Grid item flex={1}>
                  <TextField fullWidth value={i[1]} label={i[0]} onChange={e => handleChange(() => Imitation.state.graphConfig.dependenciesMap[i[0]] = e.target.value)} />
                </Grid>
                <Grid item>
                  <IconButton onClick={() => handleDelete(i[0])}><DeleteOutlineIcon /></IconButton>
                </Grid>
              </Grid>
            </Grid>
          })
        }
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems='center'>
            <Grid item flex={1}>
              <TextField fullWidth value={name} label='新增' onChange={e => setName(e.target.value)} />
            </Grid>
            <Grid item>
              <IconButton onClick={handleAdd}><AddOutlinedIcon /></IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AccordionS>
  </Grid >
}

function Document(props) {
  const { handleChange } = props

  return <Grid item xs={12}>
    <AccordionS defaultExpanded={false} title='文档配置'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth value={Imitation.state.graphConfig.document.title} label='标题' onChange={e => handleChange(() => Imitation.state.graphConfig.document.title = e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth value={Imitation.state.graphConfig.document.icon} label='图标' onChange={e => handleChange(() => Imitation.state.graphConfig.document.icon = e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth value={Imitation.state.graphConfig.document.viewport} label='viewport' onChange={e => handleChange(() => Imitation.state.graphConfig.document.viewport = e.target.value)} />
        </Grid>
      </Grid>
    </AccordionS>
  </Grid>
}

function Project(props) {
  const { handleChange } = props

  return <Grid item xs={12}>
    <AccordionS defaultExpanded={false} title='项目配置'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField fullWidth value={Imitation.state.graphConfig.project.renderId} label='渲染绑定Id' onChange={e => handleChange(() => Imitation.state.graphConfig.project.renderId = e.target.value)} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth value={Imitation.state.graphConfig.project.updateId} label='渲染更新Id' onChange={e => handleChange(() => Imitation.state.graphConfig.project.updateId = e.target.value)} />
        </Grid>
      </Grid>
    </AccordionS>
  </Grid>
}

function WriteJson(props) {
  const [modalContent, setModalContent] = React.useState()
  const [modalConfig, setModalConfig] = React.useState()

  const handleChangeContent = e => {
    Imitation.assignState({ graphContent: JSON.parse(e), graphContentUpdate: hash() })
    setModalContent()
  }
  const handleChangConfig = e => {
    Imitation.assignState({ graphConfig: JSON.parse(e), graphConfigUpdate: hash() })
    setModalConfig()
  }

  return <Grid item xs={12}>
    <AccordionS defaultExpanded={false} title='编辑JSON'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant='outlined' fullWidth onClick={e => setModalContent(true)}>配置Content</Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant='outlined' fullWidth onClick={e => setModalConfig(true)}>查看Config</Button>
        </Grid>
      </Grid>
    </AccordionS>

    {
      modalContent ?
        <CodeModal
          onClose={() => setModalContent()}
          value={JSON.stringify(Imitation.state.graphContent, true, 2)}
          onChange={handleChangeContent}
          mode='json'
        /> : null
    }
    {
      modalConfig ?
        <CodeModal
          onClose={() => setModalConfig()}
          value={JSON.stringify(Imitation.state.graphConfig, true, 2)}
          onChange={handleChangConfig}
          mode='json'
        /> : null
    }
  </Grid>
}

function App() {
  const handleChange = (callback) => {
    callback()
    Imitation.assignState({ graphConfigUpdate: hash() })
  }

  const handleExport = () => {
    const data = {
      graphContent: Imitation.state.graphContent,
      graphConfig: Imitation.state.graphConfig
    }
    copy(JSON.stringify(data), () => { Imitation.assignState({ message: '复制到剪切板' }) })
  }

  const handleImport = () => {
    const v = prompt('导入内容')
    try {
      const data = JSON.parse(v)
      Imitation.assignState({ graphContent: data.graphContent, graphContentUpdate: hash(), graphConfig: data.graphConfig, graphConfigUpdate: hash(), message: '导入成功', modalContent: undefined })
    } catch { }
  }

  const handleImportElement = () => {
    const v = prompt('导入内容')
    try {
      const data = deepCopyElement(JSON.parse(v))
      Imitation.state.graphContent.push(data)
      Imitation.assignState({ graphContentUpdate: hash(), message: '导入成功', modalContent: undefined })
    } catch { }
  }

  return <Grid container spacing={2}>
    <Grid item xs={12} style={{ fontWeight: 'bold' }}>控制器配置</Grid>
    <Grid item xs={12}><Divider /></Grid>

    <Screen handleChange={handleChange} />
    <Document handleChange={handleChange} />
    <Project handleChange={handleChange} />
    <DependenciesMap handleChange={handleChange} />
    <WriteJson />

    <Grid item xs={12}><Divider /></Grid>
    <Grid item xs={12}>
      <Button variant='outlined' color='primary' fullWidth onClick={handleExport}>导出</Button>
    </Grid>
    <Grid item xs={12}>
      <Button variant='outlined' color='primary' fullWidth onClick={handleImport}>导入</Button>
    </Grid>
    <Grid item xs={12}>
      <Button variant='outlined' color='primary' fullWidth onClick={handleImportElement}>导入元素</Button>
    </Grid>
  </Grid>
}

export default App