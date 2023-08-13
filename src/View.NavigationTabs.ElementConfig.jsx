import React from 'react'

import { Grid } from '@mui/material'
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

import Imitation from './utils.imitation'
import { deepSearch, deleteArrayItem, deepCopyElement, getEventName, hash, copy } from './utils.common'
import { evalBeforeRenderHook, evalEventMonitorDefault, evalEventTriggerDefault } from './utils.const'
import { graphElementSearch } from './utils.graph.common'
import { TooltipSX, TextFieldSX, AutocompleteSX, SelectSX } from './utils.mui.sx'

import { MonitorDialog, TriggerDialog } from './View.Component.EventDialog'
import { AceDialog } from './View.Component.Ace'
import * as ElementConfigComponent from './View.Component.ElementConfig'

function BasicConfig(props) {
  const { currentGraphContent, parentGraphContent } = props

  const { information, license } = React.useMemo(() => graphElementSearch(currentGraphContent.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information || !license) return null

  const handleChange = (value) => {
    currentGraphContent.name = value
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  return <Grid item xs={12}>
    <Accordion defaultExpanded={true}>
      <AccordionSummary>Basic Information</AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Name' disabled value={information.name} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Id' disabled value={currentGraphContent.id} />
          </Grid>
          {
            currentGraphContent.description ?
              <Grid item xs={12}>
                <TextField {...TextFieldSX} fullWidth label='Description' value={currentGraphContent.description} multiline />
              </Grid> : null
          }
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth label='Custom Name' value={currentGraphContent.name} onChange={e => handleChange(e.target.value)} />
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
  const { currentGraphContent, parentGraphContent } = props

  const { information } = React.useMemo(() => graphElementSearch(currentGraphContent.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!currentGraphContent.style || !information) return null

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

  const style = [
    use(['render'], <ElementConfigComponent.Render_C value={currentGraphContent} onChange={handleChange} />),
    use(['visible'], <ElementConfigComponent.Visible_C value={currentGraphContent} onChange={handleChange} />),
    use(['width', 'height'], <ElementConfigComponent.Size_C value={currentGraphContent} onChange={handleChange} />),
    use(['minWidth', 'minHeight', 'maxWidth', 'maxHeight'], <ElementConfigComponent.SizeLimit_C value={currentGraphContent} onChange={handleChange} />),
    use(['padding'], <ElementConfigComponent.Padding_C value={currentGraphContent} onChange={handleChange} />),
    use(['margin'], <ElementConfigComponent.Margin_C value={currentGraphContent} onChange={handleChange} />),
    use(['display'], <ElementConfigComponent.Display_C value={currentGraphContent} onChange={handleChange} />),
    use(['position'], <ElementConfigComponent.Position_C value={currentGraphContent} onChange={handleChange} />),
    use(['inset'], <ElementConfigComponent.Inset_C value={currentGraphContent} onChange={handleChange} />),
    use(['zIndex'], <ElementConfigComponent.ZIndex_C value={currentGraphContent} onChange={handleChange} />),
    use(['verticalAlign'], <ElementConfigComponent.VerticalAlign_C value={currentGraphContent} onChange={handleChange} />),
    use(['flex'], <ElementConfigComponent.Flex_C value={currentGraphContent} onChange={handleChange} />),
    use(['transform'], <ElementConfigComponent.Transform_C value={currentGraphContent} onChange={handleChange} />),
    use(['overflow'], <ElementConfigComponent.Overflow_C value={currentGraphContent} onChange={handleChange} />),
    use(['transition'], <ElementConfigComponent.Transition_C value={currentGraphContent} onChange={handleChange} />),
    use(['filter'], <ElementConfigComponent.Filter_C value={currentGraphContent} onChange={handleChange} />),
    use(['border'], <ElementConfigComponent.Border_C value={currentGraphContent} onChange={handleChange} />),
    use(['borderRadius'], <ElementConfigComponent.BorderRadius_C value={currentGraphContent} onChange={handleChange} />),
    use(['boxShadow'], <ElementConfigComponent.BoxShadow_C value={currentGraphContent} onChange={handleChange} />),
    use(['outline'], <ElementConfigComponent.Outline_C value={currentGraphContent} onChange={handleChange} />),
    use(['background'], <ElementConfigComponent.Background_C value={currentGraphContent} onChange={handleChange} />),
    use(['font'], <ElementConfigComponent.Font_C value={currentGraphContent} onChange={handleChange} />),
    use(['text'], <ElementConfigComponent.Text_C value={currentGraphContent} onChange={handleChange} />),
    use(['textDecoration'], <ElementConfigComponent.TextDecoration_C value={currentGraphContent} onChange={handleChange} />),
    use(['textShadow'], <ElementConfigComponent.TextShadow_C value={currentGraphContent} onChange={handleChange} />),
    use(['textStroke'], <ElementConfigComponent.TextStroke_C value={currentGraphContent} onChange={handleChange} />),
    use(['cursor'], <ElementConfigComponent.Cursor_C value={currentGraphContent} onChange={handleChange} />),
  ]

  return <>
    {
      style.filter(i => i).length ?
        <Grid item xs={12}>
          <Accordion defaultExpanded={false}>
            <AccordionSummary>Style Config</AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                {
                  style
                }
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid> : null
    }
  </>
}

function PropertyConfig(props) {
  const { currentGraphContent, parentGraphContent } = props

  if (!currentGraphContent.property) return null

  const { Edit } = React.useMemo(() => graphElementSearch(currentGraphContent.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!Edit) return null

  const handleChange = (value) => {
    if (typeof value === 'function') {
      value(currentGraphContent.property)
    }
    if (typeof value !== 'function') {
      currentGraphContent.property = value
    }
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Property Config</AccordionSummary>
      <AccordionDetails>
        <Edit
          value={currentGraphContent.property}
          onChange={handleChange}
          component={{ AceDialog }}
          sx={{ TooltipSX: TooltipSX, TextFieldSX: TextFieldSX, AutocompleteSX: AutocompleteSX, SelectSX: SelectSX }}
        />
      </AccordionDetails>
    </Accordion>
  </Grid>
}

function ChildrenConfig(props) {
  const { currentGraphContent, parentGraphContent } = props

  if (!currentGraphContent.children) return null

  const { information } = React.useMemo(() => graphElementSearch(currentGraphContent.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const [options, setOptions] = React.useState(information.children)
  const [current, setCurrent] = React.useState(information.children[0].value)

  const handleAdd = () => {
    Imitation.assignState({ modalVisible: 'AddElement', modalContent: Imitation.state.modalContent + '@' + current })
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
            currentGraphContent.children[current].map(i => {
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
  const { currentGraphContent, parentGraphContent, defaultExpanded } = props

  const [aceDialog, setAceDialog] = React.useState()

  const handleChange = (value) => {
    currentGraphContent.hook[aceDialog] = value
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
                <Switch checked={currentGraphContent.hook.useBeforeRenderHook} onChange={e => handleChangeCallback(() => currentGraphContent.hook.useBeforeRenderHook = e.target.checked)} />
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
          value={currentGraphContent.hook.beforeRenderHook}
          onChange={e => handleChange(e)}
          initValue={evalBeforeRenderHook}
          mode='javascript'
        /> : null
    }
  </Grid>
}

function MonitorConfig(props) {
  const { currentGraphContent, parentGraphContent, defaultExpanded } = props

  const [modal, setModal] = React.useState()

  if (!currentGraphContent.monitor) return null

  const { information } = React.useMemo(() => graphElementSearch(currentGraphContent.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const handleChange = (index, value) => {
    setModal(undefined)
    currentGraphContent.monitor[index] = value
    Imitation.assignState({ graphContentUpdate: hash() })
  }
  const handleAdd = () => {
    currentGraphContent.monitor.push({ name: hash(), event: evalEventMonitorDefault, key: '', useEval: false })
    Imitation.assignState({ graphContentUpdate: hash() })
  }
  const handleDelete = (index) => {
    setModal(undefined)
    currentGraphContent.monitor.splice(index, 1)
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
            currentGraphContent.monitor.map((i, index) => {
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
  const { currentGraphContent, parentGraphContent, defaultExpanded } = props

  const [modal, setModal] = React.useState()

  if (!currentGraphContent.trigger) return null

  const { information } = React.useMemo(() => graphElementSearch(currentGraphContent.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const handleChange = (index, value) => {
    setModal(undefined)
    currentGraphContent.trigger[index] = value
    Imitation.assignState({ graphContentUpdate: hash() })
  }
  const handleAdd = () => {
    currentGraphContent.trigger.push({ name: '', event: evalEventTriggerDefault, key: '', useEval: false })
    Imitation.assignState({ graphContentUpdate: hash() })
  }
  const handleDelete = (index) => {
    setModal(undefined)
    currentGraphContent.trigger.splice(index, 1)
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
            currentGraphContent.trigger.map((i, index) => {
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

  const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'id', Imitation.state.navigationTabsElementValue)

  if (!currentGraphContent) return null

  const handleDelete = () => {
    deleteArrayItem(parentGraphContent, currentGraphContent)
    Imitation.assignState({ graphContentUpdate: hash(), navigationTabsElementValue: undefined, navigationTabsValue: 'ElementShop' })
  }

  const handleCopy = () => {
    const newElement = deepCopyElement(currentGraphContent)
    parentGraphContent.push(newElement)
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  const handleDownload = () => {
    copy(JSON.stringify(currentGraphContent), () => { Imitation.assignState({ message: 'Copy Success' }) })
  }

  return <Grid container spacing={2}>
    <Grid item xs={12}>Element Config</Grid>
    <Grid item xs={12}><Divider /></Grid>

    <BasicConfig currentGraphContent={currentGraphContent} parentGraphContent={parentGraphContent} />
    <StyleConfig currentGraphContent={currentGraphContent} parentGraphContent={parentGraphContent} />
    <PropertyConfig currentGraphContent={currentGraphContent} parentGraphContent={parentGraphContent} />
    <ChildrenConfig currentGraphContent={currentGraphContent} parentGraphContent={parentGraphContent} />
    <HookConfig currentGraphContent={currentGraphContent} parentGraphContent={parentGraphContent} />
    <MonitorConfig currentGraphContent={currentGraphContent} parentGraphContent={parentGraphContent} />
    <TriggerConfig currentGraphContent={currentGraphContent} parentGraphContent={parentGraphContent} />

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