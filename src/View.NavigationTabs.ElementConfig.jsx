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
import { Accordion } from '@mui/material'
import { AccordionSummary } from '@mui/material'
import { AccordionDetails } from '@mui/material'
import { IconButton } from '@mui/material'
import { Paper } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DownloadIcon from '@mui/icons-material/Download'
import UploadIcon from '@mui/icons-material/Upload'
import SettingsIcon from '@mui/icons-material/Settings'

import Imitation from './utils.imitation'
import { getElementAndParentById, deleteArrayItem, copyElement, updateTriggerLink, hash, copy, getElementsAll } from './utils.common'
import { searchElement } from './utils.graph.common'
import { TooltipSX, TextFieldSX, AutocompleteSX, SelectSX } from './utils.mui.sx'

import { HookConfig as HookConfigComponent, MonitorConfig as MonitorConfigComponenent, TriggerConfig as TriggerConfigComponent } from './View.Component.EventDialog'
import { AceDialog } from './View.Component.Ace'
import * as ElementConfigComponent from './View.Component.ElementConfig'

function BasicConfig(props) {
  const { currentGraphElement, parentGraphElement, information, license, Edit } = props

  if (!information) return null

  if (!license) return null

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
            <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Name' disabled value={information.name} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Id' disabled value={currentGraphElement.id} />
          </Grid>
          {
            currentGraphElement.description ?
              <Grid item xs={12}>
                <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Description' value={currentGraphElement.description} multiline />
              </Grid> : null
          }
          <Grid item xs={12}>
            <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Custom Name' value={currentGraphElement.name} onChange={e => handleChange(e.target.value)} />
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
  const { currentGraphElement, parentGraphElement, information, license, Edit } = props

  if (!currentGraphElement.style) return null

  if (!information) return null

  const [options, setOptions] = React.useState(information.style)
  const [current, setCurrent] = React.useState(information.style[0].value)

  const handleChange = (callback) => {
    callback()
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  const renderStyle = (rule) => {
    const use = (name, children) => {
      if (!rule) return children

      var status = true

      name.forEach(i => {
        if (rule.$use) {
          const r = rule.$use.find(i_ => i_ === i)
          if (r === undefined) status = false
        }
        if (rule.$nonuse) {
          const r = rule.$nonuse.find(i_ => i_ === i)
          if (r !== undefined) status = false
        }
      })

      return status ? children : null
    }

    const style = [
      use(['visibility'], <ElementConfigComponent.Visibility value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['width', 'height'], <ElementConfigComponent.Size value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['minWidth', 'minHeight', 'maxWidth', 'maxHeight'], <ElementConfigComponent.SizeLimit value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['padding'], <ElementConfigComponent.Padding value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['margin'], <ElementConfigComponent.Margin value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['display'], <ElementConfigComponent.Display value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['position'], <ElementConfigComponent.Position value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['inset'], <ElementConfigComponent.Inset value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['zIndex'], <ElementConfigComponent.ZIndex value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['verticalAlign'], <ElementConfigComponent.VerticalAlign value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['flex'], <ElementConfigComponent.Flex value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['transform'], <ElementConfigComponent.Transform value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['overflow'], <ElementConfigComponent.Overflow value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['transition'], <ElementConfigComponent.Transition value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['filter'], <ElementConfigComponent.Filter value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['border'], <ElementConfigComponent.Border value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['borderRadius'], <ElementConfigComponent.BorderRadius value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['boxShadow'], <ElementConfigComponent.BoxShadow value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['outline'], <ElementConfigComponent.Outline value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['background'], <ElementConfigComponent.Background value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['font'], <ElementConfigComponent.Font value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['text'], <ElementConfigComponent.Text value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['textDecoration'], <ElementConfigComponent.TextDecoration value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['textShadow'], <ElementConfigComponent.TextShadow value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['textStroke'], <ElementConfigComponent.TextStroke value={currentGraphElement.style[current]} onChange={handleChange} />),
      use(['cursor'], <ElementConfigComponent.Cursor value={currentGraphElement.style[current]} onChange={handleChange} />),
    ]

    return style
  }

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>Style Config</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Area</InputLabel>
              <Select {...SelectSX} label='Area' value={current} onChange={e => setCurrent(e.target.value)}>
                {
                  options.map(i => {
                    return <MenuItem value={i.value}>{i.label}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          {
            renderStyle(information.style.find(i_ => i_.value === current))
          }
        </Grid>
      </AccordionDetails>
    </Accordion>
  </Grid>
}

function PropertyConfig(props) {
  const { currentGraphElement, parentGraphElement, information, license, Edit } = props

  if (!currentGraphElement.property) return null

  if (!Edit) return null

  const update = (value) => {
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Property Config</AccordionSummary>
      <AccordionDetails>
        <Edit
          element={currentGraphElement}
          property={currentGraphElement.property}
          style={currentGraphElement.style}
          update={update}
          component={{ AceDialog }}
          sx={{ TooltipSX: TooltipSX, TextFieldSX: TextFieldSX, AutocompleteSX: AutocompleteSX, SelectSX: SelectSX }}
          sendMessage={message => Imitation.assignState({ message: message })}
        />
      </AccordionDetails>
    </Accordion>
  </Grid>
}

function ChildrenConfig(props) {
  const { currentGraphElement, parentGraphElement, information, license, Edit } = props

  if (!currentGraphElement.children) return null
  
  if (!information) return null

  const [options, setOptions] = React.useState(information.children)
  const [current, setCurrent] = React.useState(information.children[0].value)

  const handleAdd = () => {
    Imitation.assignState({ navigationTabsValue: 'ElementShop', navigationTabsElementValue: Imitation.state.navigationTabsElementValue.split('@')[0] + '@' + current })
  }

  const handleEdit = (i) => {
    Imitation.assignState({ navigationTabsElementValue: i })
  }

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Children Config</AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControl {...SelectSX} fullWidth>
              <InputLabel>Area</InputLabel>
              <Select {...SelectSX} label='Area' value={current} onChange={e => setCurrent(e.target.value)}>
                {
                  options.map(i => {
                    return <MenuItem value={i.value}>{i.label}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          {
            currentGraphElement.children[current].map((i, index) => {
              return <Grid item xs={12} key={index}>
                <Paper style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4, paddingLeft: 12 }}>
                  <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <span>{i.name} {i.id}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={() => handleEdit(i.id)}><EditIcon style={{ fontSize: 22 }} /></IconButton>
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
  </Grid>
}

function HookConfig(props) {
  const { currentGraphElement, parentGraphElement, information, license, Edit } = props

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Event Config / Hook</AccordionSummary>
      <AccordionDetails>
        <HookConfigComponent currentGraphElement={currentGraphElement} />
      </AccordionDetails>
    </Accordion>
  </Grid>
}

function MonitorConfig(props) {
  const { currentGraphElement, parentGraphElement, information, license, Edit } = props

  if (!currentGraphElement.monitor) return null

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Event Config / Monitor</AccordionSummary>
      <AccordionDetails>
        <MonitorConfigComponenent currentGraphElement={currentGraphElement} />
      </AccordionDetails>
    </Accordion>
  </Grid>
}

function TriggerConfig(props) {
  const { currentGraphElement, parentGraphElement, information, license, Edit } = props

  if (!currentGraphElement.trigger) return null

  return <Grid item xs={12}>
    <Accordion defaultExpanded={false}>
      <AccordionSummary>Event Config / Trigger</AccordionSummary>
      <AccordionDetails>
        <TriggerConfigComponent currentGraphElement={currentGraphElement} />
      </AccordionDetails>
    </Accordion>
  </Grid>
}

function Action(props) {
  const { currentGraphElement, parentGraphElement, information, license, Edit } = props

  const handleDelete = () => {
    const elementIds = getElementsAll([currentGraphElement]).map(i => i.id)
    deleteArrayItem(parentGraphElement, currentGraphElement)

    Imitation.state.graphEvent.filter(i => elementIds.includes(i.elementId) === true).forEach(i => updateTriggerLink(Imitation.state.graphContent, i.eventId))
    Imitation.state.graphEvent = Imitation.state.graphEvent.filter(i => elementIds.includes(i.elementId) === false)

    Imitation.assignState({ graphContentUpdate: hash(), navigationTabsElementValue: undefined, navigationTabsValue: 'ElementShop' })
  }

  const handleCopy = () => {
    const newElement = copyElement(currentGraphElement)
    parentGraphElement.push(newElement)
    Imitation.assignState({ graphContentUpdate: hash() })
  }

  const handleDownload = () => {
    copy(JSON.stringify(currentGraphElement), () => { Imitation.assignState({ message: 'Copy Success' }) })
  }

  return <>
    <Grid item xs={12}>
      <Button variant='outlined' color='primary' fullWidth style={{ textTransform: 'none' }} onClick={handleCopy}>Copy Element</Button>
    </Grid>
    <Grid item xs={12}>
      <Button variant='outlined' color='primary' fullWidth style={{ textTransform: 'none' }} onClick={handleDownload}>Export Element</Button>
    </Grid>
    <Grid item xs={12}>
      <Button variant='outlined' color='primary' fullWidth style={{ textTransform: 'none' }} onClick={handleDelete}>Delete Element</Button>
    </Grid>
  </>
}

function App() {
  if (Imitation.state.navigationTabsElementValue === undefined) return null

  const [currentGraphElement, parentGraphElement] = React.useMemo(() => getElementAndParentById(Imitation.state.graphContent, Imitation.state.navigationTabsElementValue.split('@')[0]), [Imitation.state.graphContentUpdate, Imitation.state.graphElementUpdate, Imitation.state.navigationTabsElementValue])

  const { information, license, Edit } = React.useMemo(() => searchElement(currentGraphElement.license, Imitation.state.graphElement), [Imitation.state.graphContentUpdate, Imitation.state.graphElementUpdate, Imitation.state.navigationTabsElementValue])

  if (!currentGraphElement) return null

  return <Grid container spacing={2}>
    <Grid item xs={12}>Element Config</Grid>
    <Grid item xs={12}><Divider /></Grid>
    <BasicConfig currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} information={information} license={license} Edit={Edit} />
    <StyleConfig currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} information={information} license={license} Edit={Edit} />
    <PropertyConfig currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} information={information} license={license} Edit={Edit} />
    <ChildrenConfig currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} information={information} license={license} Edit={Edit} />
    <HookConfig currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} information={information} license={license} Edit={Edit} />
    <MonitorConfig currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} information={information} license={license} Edit={Edit} />
    <TriggerConfig currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} information={information} license={license} Edit={Edit} />
    <Grid item xs={12}><Divider /></Grid>
    <Action currentGraphElement={currentGraphElement} parentGraphElement={parentGraphElement} information={information} license={license} Edit={Edit} />
  </Grid>
}

export default App