import React from 'react'

import { Grid } from '@mui/material'
import { Slider } from '@mui/material'
import { Divider } from '@mui/material'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import { IconButton } from '@mui/material'
import { Accordion } from '@mui/material'
import { AccordionSummary } from '@mui/material'
import { AccordionDetails } from '@mui/material'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import Imitation from './utils.imitation'
import { hash, copy, deepCopyElement } from './utils.common'
import { TooltipSX, TextFieldSX } from './utils.mui.sx'

import { AceDialog } from './View.Component.Ace'

function Screen(props) {
  const { handleChange } = props

  return <Grid item xs={12}>
    <Accordion defaultExpanded={true}>
      <AccordionSummary>Screen Config</AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField {...TextFieldSX} fullWidth autoComplete='off' value={Imitation.state.graphConfig.screen.width} label='Width' onChange={e => handleChange(() => Imitation.state.graphConfig.screen.width = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={6}>
            <TextField {...TextFieldSX} fullWidth autoComplete='off' value={Imitation.state.graphConfig.screen.height} label='Height' onChange={e => handleChange(() => Imitation.state.graphConfig.screen.height = e.target.value)} type='number' />
          </Grid>
          <Grid item xs={12}>
            <Button variant='outlined' fullWidth style={{ textTransform: 'none' }} onClick={e => handleChange(() => { Imitation.state.graphConfig.screen.width = 375; Imitation.state.graphConfig.screen.height = 667; })}>Phone Size</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant='outlined' fullWidth style={{ textTransform: 'none' }} onClick={e => handleChange(() => { Imitation.state.graphConfig.screen.width = 1200; Imitation.state.graphConfig.screen.height = 720; })}>PC Size</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant='outlined' fullWidth style={{ textTransform: 'none' }} onClick={e => handleChange(() => { Imitation.state.graphConfig.screen.translateX = 0; Imitation.state.graphConfig.screen.translateY = 0; })}>Reset Position</Button>
          </Grid>
          <Grid item xs={12}>
            <div>Scale</div>
            <Slider value={Imitation.state.graphConfig.screen.scale} onChange={(e, v) => handleChange(() => Imitation.state.graphConfig.screen.scale = v)} min={0} max={2} step={0.01} valueLabelDisplay='auto' />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  </Grid>
}

function Document(props) {
  const { handleChange } = props

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Document Config</AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth autoComplete='off' value={Imitation.state.graphConfig.document.title} label='Title' onChange={e => handleChange(() => Imitation.state.graphConfig.document.title = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth autoComplete='off' value={Imitation.state.graphConfig.document.icon} label='Icon' onChange={e => handleChange(() => Imitation.state.graphConfig.document.icon = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth autoComplete='off' value={Imitation.state.graphConfig.document.viewport} label='Viewport' onChange={e => handleChange(() => Imitation.state.graphConfig.document.viewport = e.target.value)} />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  </Grid>
}

function Project(props) {
  const { handleChange } = props

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Project Config</AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth autoComplete='off' value={Imitation.state.graphConfig.project.renderId} label='Render ID' onChange={e => handleChange(() => Imitation.state.graphConfig.project.renderId = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth autoComplete='off' value={Imitation.state.graphConfig.project.updateId} label='Update State ID' onChange={e => handleChange(() => Imitation.state.graphConfig.project.updateId = e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth autoComplete='off' value={Imitation.state.graphConfig.project.sourceOrigin} label='Source Origin' onChange={e => handleChange(() => Imitation.state.graphConfig.project.sourceOrigin = e.target.value)} />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  </Grid>
}

function DependenciesMap(props) {
  const { handleChange } = props

  const [name, setName] = React.useState('')

  const handleDelete = (key) => {
    handleChange(() => { delete Imitation.state.graphConfig.dependenciesMap[key] })
  }

  const handleAdd = () => {
    if (name && !Imitation.state.graphConfig.dependenciesMap[name]) {
      handleChange(() => { Imitation.state.graphConfig.dependenciesMap[name] = '' })
      setName('')
    }
  }

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Dependencies Map</AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {
            Object.entries(Imitation.state.graphConfig.dependenciesMap).map((i) => {
              return <Grid item xs={12} key={i[0]}>
                <Grid container spacing={1} alignItems='center'>
                  <Grid item flex={1}>
                    <TextField {...TextFieldSX} fullWidth autoComplete='off' value={i[1]} label={i[0]} onChange={e => handleChange(() => Imitation.state.graphConfig.dependenciesMap[i[0]] = e.target.value)} />
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
                <TextField {...TextFieldSX} fullWidth autoComplete='off' value={name} label='Add' onChange={e => setName(e.target.value)} />
              </Grid>
              <Grid item>
                <IconButton onClick={handleAdd}><AddOutlinedIcon /></IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  </Grid>
}

function WriteJson(props) {
  const [graphContentAceDialog, setGraphContentAceDialog] = React.useState()
  const [graphConfigAceDialog, setGraphConfigAceDialog] = React.useState()

  const handleChangeContent = e => {
    Imitation.assignState({ graphContent: JSON.parse(e), graphContentUpdate: hash() })
    setGraphContentAceDialog()
  }
  const handleChangConfig = e => {
    Imitation.assignState({ graphConfig: JSON.parse(e), graphConfigUpdate: hash() })
    setGraphConfigAceDialog()
  }

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Edit JSON</AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button variant='outlined' fullWidth style={{ textTransform: 'none' }} onClick={e => setGraphContentAceDialog(true)}>Edit Content JSON</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant='outlined' fullWidth style={{ textTransform: 'none' }} onClick={e => setGraphConfigAceDialog(true)}>Edit Config JSON</Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>

    {
      graphContentAceDialog ?
        <AceDialog
          onClose={() => setGraphContentAceDialog()}
          value={JSON.stringify(Imitation.state.graphContent, true, 2)}
          onChange={handleChangeContent}
          mode='json'
        /> : null
    }
    {
      graphConfigAceDialog ?
        <AceDialog
          onClose={() => setGraphConfigAceDialog()}
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
    copy(JSON.stringify(data), () => { Imitation.assignState({ message: 'Copy Success' }) })
  }

  const handleImport = () => {
    const v = prompt('Import Data')
    try {
      const data = JSON.parse(v)
      Imitation.assignState({ graphContent: data.graphContent, graphContentUpdate: hash(), graphConfig: data.graphConfig, graphConfigUpdate: hash(), message: 'Import Success', navigationTabsElementValue: undefined })
    } catch { }
  }

  const handleImportElement = () => {
    const v = prompt('Import Element')
    try {
      const data = deepCopyElement(JSON.parse(v))
      Imitation.state.graphContent.push(data)
      Imitation.assignState({ graphContentUpdate: hash(), message: 'Import Success', navigationTabsElementValue: undefined })
    } catch { }
  }

  return <Grid container spacing={2}>
    <Grid item xs={12}>Graph Config</Grid>
    <Grid item xs={12}><Divider /></Grid>

    <Screen handleChange={handleChange} />
    <Document handleChange={handleChange} />
    <Project handleChange={handleChange} />
    <DependenciesMap handleChange={handleChange} />
    <WriteJson />

    <Grid item xs={12}><Divider /></Grid>
    <Grid item xs={12}>
      <Button variant='outlined' color='primary' fullWidth style={{ textTransform: 'none' }} onClick={handleExport}>Export Data</Button>
    </Grid>
    <Grid item xs={12}>
      <Button variant='outlined' color='primary' fullWidth style={{ textTransform: 'none' }} onClick={handleImport}>Import Data</Button>
    </Grid>
    <Grid item xs={12}>
      <Button variant='outlined' color='primary' fullWidth style={{ textTransform: 'none' }} onClick={handleImportElement}>Import Element</Button>
    </Grid>
  </Grid>
}

export default App