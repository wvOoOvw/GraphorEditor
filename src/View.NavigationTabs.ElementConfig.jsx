import React from 'react'

import { Grid, Tooltip } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { Switch } from '@mui/material'
import { Divider } from '@mui/material'
import { Chip } from '@mui/material'
import { List } from '@mui/material'
import { ListItemButton } from '@mui/material'
import { ListItemIcon } from '@mui/material'
import { ListItemText } from '@mui/material'
import { Accordion } from '@mui/material'
import { AccordionSummary } from '@mui/material'
import { AccordionDetails } from '@mui/material'
import { IconButton } from '@mui/material'
import { Paper } from '@mui/material'

import CodeIcon from '@mui/icons-material/Code'
import CodeOffIcon from '@mui/icons-material/CodeOff'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DownloadIcon from '@mui/icons-material/Download'
import UploadIcon from '@mui/icons-material/Upload'
import SettingsIcon from '@mui/icons-material/Settings'

import Imitation from './utils.imitation'
import { deepSearch, deleteArrayItem, deepCopyElement, getEventName, hash, copy } from './utils.common'
import { evalBeforeRenderHook, evalEventMonitorDefault, evalEventTriggerDefault } from './utils.const'
import { graphElementSearch } from './utils.graph.common'
import { TooltipSX, TextFieldSX, AutocompleteSX, SelectSX } from './utils.mui.sx'

import { MonitorDialog, TriggerDialog } from './View.Component.EventDialog'
import { AceDialog } from './View.Component.Ace'
import * as ElementConfigComponent from './View.Component.ElementConfig'

function BasicConfig(props) {
  const { currentGraphElement, parentGraphElement } = props

  const { information, license } = React.useMemo(() => graphElementSearch(currentGraphElement.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information || !license) return null

  const handleChange = (value) => {
    currentGraphElement.name = value
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  return <Grid item xs={12}>
    <Accordion defaultExpanded={true}>
      <AccordionSummary>Basic Information</AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>Use</div>
            <Switch checked={currentGraphElement.use} onChange={e => { currentGraphElement.use = e.target.checked; Imitation.assignState({ graphContentUpdate: hash() }); }} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Name' disabled value={information.name} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Id' disabled value={currentGraphElement.id} />
          </Grid>
          {
            currentGraphElement.description ?
              <Grid item xs={12}>
                <TextField {...TextFieldSX} fullWidth label='Description' value={currentGraphElement.description} multiline />
              </Grid> : null
          }
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Custom Name' value={currentGraphElement.name} onChange={e => handleChange(e.target.value)} />
          </Grid>
          {
            license.dependencies && license.dependencies.length ?
              <Grid item xs={12}>
                <Grid container spacing={1} alignItems='center'>
                  <Grid item>Dependencies</Grid>
                  {
                    license.dependencies.map((i, index) => {
                      return <Grid item><Chip key={index} label={i} color='primary' /></Grid>
                    })
                  }
                </Grid>
              </Grid> : null
          }
        </Grid>
      </AccordionDetails>
    </Accordion>
  </Grid>
}

function StyleConfig(props) {
  const { currentGraphElement, parentGraphElement } = props

  const { information } = React.useMemo(() => graphElementSearch(currentGraphElement.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!currentGraphElement.style || !information) return null

  const handleChange = (callback) => {
    callback()
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  const use = (name, children) => {
    var status = true
    name.forEach(i => {
      if (information.style.$use) {
        const r = information.style.$use.find(i_ => i_ === i)
        if (r === undefined) status = false
      }
      if (information.style.$nonuse) {
        const r = information.style.$nonuse.find(i_ => i_ === i)
        if (r !== undefined) status = false
      }
    })

    return status ? children : null
  }

  const handleExport = () => {
    copy(JSON.stringify(currentGraphElement.style), () => { Imitation.assignState({ message: 'Copy Success' }) })
  }

  const handleImport = () => {
    const v = prompt('Import Style')
    try {
      const data = JSON.parse(v)
      Imitation.assignState({ graphContent: data.graphContent, graphContentUpdate: hash(), graphConfig: data.graphConfig, graphConfigUpdate: hash(), message: 'Import Success', navigationTabsElementValue: undefined })
    } catch { }
  }


  const style = [
    use(['visibility'], <ElementConfigComponent.Visibility value={currentGraphElement} onChange={handleChange} />),
    use(['width', 'height'], <ElementConfigComponent.Size value={currentGraphElement} onChange={handleChange} />),
    use(['minWidth', 'minHeight', 'maxWidth', 'maxHeight'], <ElementConfigComponent.SizeLimit value={currentGraphElement} onChange={handleChange} />),
    use(['padding'], <ElementConfigComponent.Padding value={currentGraphElement} onChange={handleChange} />),
    use(['margin'], <ElementConfigComponent.Margin value={currentGraphElement} onChange={handleChange} />),
    use(['display'], <ElementConfigComponent.Display value={currentGraphElement} onChange={handleChange} />),
    use(['position'], <ElementConfigComponent.Position value={currentGraphElement} onChange={handleChange} />),
    use(['inset'], <ElementConfigComponent.Inset value={currentGraphElement} onChange={handleChange} />),
    use(['zIndex'], <ElementConfigComponent.ZIndex value={currentGraphElement} onChange={handleChange} />),
    use(['verticalAlign'], <ElementConfigComponent.VerticalAlign value={currentGraphElement} onChange={handleChange} />),
    use(['flex'], <ElementConfigComponent.Flex value={currentGraphElement} onChange={handleChange} />),
    use(['transform'], <ElementConfigComponent.Transform value={currentGraphElement} onChange={handleChange} />),
    use(['overflow'], <ElementConfigComponent.Overflow value={currentGraphElement} onChange={handleChange} />),
    use(['transition'], <ElementConfigComponent.Transition value={currentGraphElement} onChange={handleChange} />),
    use(['filter'], <ElementConfigComponent.Filter value={currentGraphElement} onChange={handleChange} />),
    use(['border'], <ElementConfigComponent.Border value={currentGraphElement} onChange={handleChange} />),
    use(['borderRadius'], <ElementConfigComponent.BorderRadius value={currentGraphElement} onChange={handleChange} />),
    use(['boxShadow'], <ElementConfigComponent.BoxShadow value={currentGraphElement} onChange={handleChange} />),
    use(['outline'], <ElementConfigComponent.Outline value={currentGraphElement} onChange={handleChange} />),
    use(['background'], <ElementConfigComponent.Background value={currentGraphElement} onChange={handleChange} />),
    use(['font'], <ElementConfigComponent.Font value={currentGraphElement} onChange={handleChange} />),
    use(['text'], <ElementConfigComponent.Text value={currentGraphElement} onChange={handleChange} />),
    use(['textDecoration'], <ElementConfigComponent.TextDecoration value={currentGraphElement} onChange={handleChange} />),
    use(['textShadow'], <ElementConfigComponent.TextShadow value={currentGraphElement} onChange={handleChange} />),
    use(['textStroke'], <ElementConfigComponent.TextStroke value={currentGraphElement} onChange={handleChange} />),
    use(['cursor'], <ElementConfigComponent.Cursor value={currentGraphElement} onChange={handleChange} />),
  ]

  return <>
    {
      style.filter(i => i).length ?
        <>
          <Grid item xs={12}>
            <Accordion defaultExpanded={false}>
              <AccordionSummary>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <div>Style Config</div>
                  <div>
                    <Tooltip
                      {...TooltipSX}
                      title={
                        <>
                          <IconButton><UploadIcon fontSize='small' /></IconButton>
                          <IconButton><DownloadIcon fontSize='small' /></IconButton>
                        </>
                      }
                    >
                      <SettingsIcon style={{ fontSize: 20 }} />
                    </Tooltip>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1}>
                  {
                    style
                  }
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </>
        : null
    }
  </>
}

function PropertyConfig(props) {
  const { currentGraphElement, parentGraphElement } = props

  if (!currentGraphElement.property) return null

  const { Edit } = React.useMemo(() => graphElementSearch(currentGraphElement.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!Edit) return null

  const handleChange = (value) => {
    if (typeof value === 'function') {
      value(currentGraphElement.property)
    }
    if (typeof value !== 'function') {
      currentGraphElement.property = value
    }
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Property Config</AccordionSummary>
      <AccordionDetails>
        <Edit
          value={currentGraphElement.property}
          onChange={handleChange}
          component={{ AceDialog }}
          sx={{ TooltipSX: TooltipSX, TextFieldSX: TextFieldSX, AutocompleteSX: AutocompleteSX, SelectSX: SelectSX }}
        />
      </AccordionDetails>
    </Accordion>
  </Grid>
}

function ChildrenConfig(props) {
  const { currentGraphElement, parentGraphElement } = props

  if (!currentGraphElement.children) return null

  const { information } = React.useMemo(() => graphElementSearch(currentGraphElement.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const [options, setOptions] = React.useState(information.children)
  const [current, setCurrent] = React.useState(information.children[0].value)

  const handleAdd = () => {
    Imitation.assignState({ navigationTabsValue: 'ElementShop', navigationTabsElementValue: Imitation.state.navigationTabsElementValue + '@' + current })
  }

  const handleEdit = (i) => {
    Imitation.assignState({ modalContent: i })
  }

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Children Config</AccordionSummary>
      <AccordionDetails>
        <FormControl {...SelectSX} fullWidth>
          <InputLabel>Model</InputLabel>
          <Select {...SelectSX} label='Model' value={current} onChange={e => setCurrent(e.target.value)}>
            {
              options.map(i => {
                return <MenuItem value={i.value}>{i.label}</MenuItem>
              })
            }
          </Select>
        </FormControl>
        <List>
          {
            currentGraphElement.children[current].map(i => {
              return <ListItemButton key={i.id} onClick={() => handleEdit(i.id)} sx={{ '& *': { fontSize: '14px !important' } }}>
                <ListItemText>
                  {
                    i.name
                  }
                </ListItemText>
                <ListItemText style={{ color: 'gray' }}>
                  {
                    i.id
                  }
                </ListItemText>
              </ListItemButton>
            })
          }
        </List>
        <Button variant='outlined' fullWidth style={{ textTransform: 'none' }} onClick={handleAdd}>Add</Button>
      </AccordionDetails>
    </Accordion>
  </Grid>
}

function HookConfig(props) {
  const { currentGraphElement, parentGraphElement, defaultExpanded } = props

  const [aceDialog, setAceDialog] = React.useState()

  const handleChange = (value) => {
    currentGraphElement.hook[aceDialog] = value
    Imitation.assignState({ graphContentUpdate: hash() })
    setAceDialog(undefined)
  }

  const handleChangeCallback = (callback) => {
    callback()
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Event Config / Hook</AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4, paddingLeft: 12 }}>
              <div>Before Render</div>
              <div>
                <IconButton onClick={() => setAceDialog('beforeRenderHook')}><CodeIcon style={{ fontSize: 22 }} /></IconButton>
                <Switch checked={currentGraphElement.hook.useBeforeRenderHook} onChange={e => handleChangeCallback(() => currentGraphElement.hook.useBeforeRenderHook = e.target.checked)} />
              </div>
            </Paper>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>

    {
      aceDialog === 'beforeRenderHook' ?
        <AceDialog
          onClose={() => setAceDialog(undefined)}
          value={currentGraphElement.hook.beforeRenderHook}
          onChange={e => handleChange(e)}
          initValue={evalBeforeRenderHook}
          mode='javascript'
        /> : null
    }
  </Grid>
}

function MonitorConfig(props) {
  const { currentGraphElement, parentGraphElement, defaultExpanded } = props

  const [modal, setModal] = React.useState()

  if (!currentGraphElement.monitor) return null

  const { information } = React.useMemo(() => graphElementSearch(currentGraphElement.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const handleChange = (index, value) => {
    setModal(undefined)
    currentGraphElement.monitor[index] = value
    Imitation.assignState({ graphContentUpdate: hash() })
  }
  const handleAdd = () => {
    currentGraphElement.monitor.push({ name: hash(), event: evalEventMonitorDefault, key: '', useEval: false })
    Imitation.assignState({ graphContentUpdate: hash() })
  }
  const handleDelete = (index) => {
    setModal(undefined)
    currentGraphElement.monitor.splice(index, 1)
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  const keyOptions = information.monitor

  if (!keyOptions && keyOptions.length === 0) return null

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Event Config / Monitor</AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {
            currentGraphElement.monitor.map((i, index) => {
              return <Grid item xs={12} key={index}>
                <Paper style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4, paddingLeft: 12 }}>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <span>{i.name}</span>
                    <span> - </span>
                    <span>
                      {
                        !i.useEval && keyOptions.find(i_ => i_.value === i.key) === undefined ? 'Empty' : null
                      }
                      {
                        !i.useEval && keyOptions.find(i_ => i_.value === i.key) !== undefined ? keyOptions.find(i_ => i_.value === i.key).label : null
                      }
                      {
                        i.useEval ? 'Custom' : null
                      }
                    </span>
                  </div>
                  <div>
                    <IconButton onClick={e => setModal({ index: index, data: i })}><EditIcon style={{ fontSize: 22 }} /></IconButton>
                  </div>
                </Paper>
              </Grid>
            })
          }
          <Grid item xs={12}>
            <Button variant='outlined' fullWidth style={{ textTransform: 'none' }} onClick={handleAdd}><AddIcon /></Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
    {
      modal ?
        <MonitorDialog
          onClose={() => setModal(undefined)}
          keyOptions={keyOptions}
          value={modal.data}
          onChange={(v) => handleChange(modal.index, v)}
          onDelete={() => handleDelete(modal.index)}
        /> : null
    }
  </Grid>
}

function TriggerConfig(props) {
  const { currentGraphElement, parentGraphElement, defaultExpanded } = props

  const [modal, setModal] = React.useState()

  if (!currentGraphElement.trigger) return null

  const { information } = React.useMemo(() => graphElementSearch(currentGraphElement.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const handleChange = (index, value) => {
    setModal(undefined)
    currentGraphElement.trigger[index] = value
    Imitation.assignState({ graphContentUpdate: hash() })
  }
  const handleAdd = () => {
    currentGraphElement.trigger.push({ name: '', event: evalEventTriggerDefault, key: '', useEval: false })
    Imitation.assignState({ graphContentUpdate: hash() })
  }
  const handleDelete = (index) => {
    setModal(undefined)
    currentGraphElement.trigger.splice(index, 1)
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  const keyOptions = information.trigger

  const monitorNameOptions = getEventName(Imitation.state.graphContent)

  if (!keyOptions || keyOptions.length === 0) return null

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Event Config / Trigger</AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          {
            currentGraphElement.trigger.map((i, index) => {
              return <Grid item xs={12} key={index}>
                <Paper style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4, paddingLeft: 12 }}>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <span>{i.name ? i.name : 'Empty'}</span>
                    <span> - </span>
                    <span>
                      {
                        !i.useEval && keyOptions.find(i_ => i_.value === i.key) === undefined ? 'Empty' : null
                      }
                      {
                        !i.useEval && keyOptions.find(i_ => i_.value === i.key) !== undefined ? keyOptions.find(i_ => i_.value === i.key).label : null
                      }
                      {
                        i.useEval ? 'Custom' : null
                      }
                    </span>
                  </div>
                  <div>
                    <IconButton onClick={e => setModal({ index: index, data: i })}><EditIcon style={{ fontSize: 22 }} /></IconButton>
                  </div>
                </Paper>
              </Grid>
            })
          }
          <Grid item xs={12}>
            <Button variant='outlined' fullWidth style={{ textTransform: 'none' }} onClick={handleAdd}><AddIcon /></Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
    {
      modal ?
        <TriggerDialog
          onClose={() => setModal(undefined)}
          keyOptions={keyOptions}
          value={modal.data}
          onChange={(v) => handleChange(modal.index, v)}
          onDelete={() => handleDelete(modal.index)}
          monitorNameOptions={monitorNameOptions}
        /> : null
    }
  </Grid>
}

function App() {
  if (!Imitation.state.navigationTabsElementValue) return null

  const [currentGraphElement, parentGraphElement] = deepSearch(Imitation.state.graphContent, 'id', Imitation.state.navigationTabsElementValue)

  if (!currentGraphElement) return null

  const handleDelete = () => {
    deleteArrayItem(parentGraphElement, currentGraphElement)
    Imitation.assignState({ graphContentUpdate: hash(), navigationTabsElementValue: undefined, navigationTabsValue: 'ElementShop' })
  }

  const handleCopy = () => {
    const newElement = deepCopyElement(currentGraphElement)
    parentGraphElement.push(newElement)
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  const handleDownload = () => {
    copy(JSON.stringify(currentGraphElement), () => { Imitation.assignState({ message: 'Copy Success' }) })
  }

  return <Grid container spacing={2}>
    <Grid item xs={12}>Element Config</Grid>
    <Grid item xs={12}><Divider /></Grid>

    <BasicConfig currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} />
    <StyleConfig currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} />
    <PropertyConfig currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} />
    <ChildrenConfig currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} />
    <HookConfig currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} />
    <MonitorConfig currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} />
    <TriggerConfig currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} />

    <Grid item xs={12}><Divider /></Grid>
    <Grid item xs={12}>
      <Button variant='outlined' color='primary' fullWidth style={{ textTransform: 'none' }} onClick={handleCopy}>Copy Element</Button>
    </Grid>
    <Grid item xs={12}>
      <Button variant='outlined' color='primary' fullWidth style={{ textTransform: 'none' }} onClick={handleDownload}>Export Element</Button>
    </Grid>
    <Grid item xs={12}>
      <Button variant='outlined' color='primary' fullWidth style={{ textTransform: 'none' }} onClick={handleDelete}>Delete Element</Button>
    </Grid>
  </Grid>
}

export default App

export { HookConfig, MonitorConfig, TriggerConfig }