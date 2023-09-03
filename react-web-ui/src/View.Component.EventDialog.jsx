import React from 'react'

import { Grid } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogActions } from '@mui/material'
import { DialogContent } from '@mui/material'
import { Switch } from '@mui/material'
import { Paper } from '@mui/material'
import { IconButton } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'

import ReactAce from 'react-ace'

import { TooltipSX, TextFieldSX, AutocompleteSX, SelectSX } from './utils.mui.sx'
import { getMonitorOptionsAll, updateTriggerLink, hash, graphElementSearch, convertCamelCase } from './utils.common'

import Imitation from './utils.imitation'

function HookConfig(props) {
  const { currentGraphElement } = props

  const [dialog, setDialog] = React.useState()

  const handleAdd = () => {
    const item = { id: hash(), use: true, hookType: '', hookEval: evalEventMonitorDefault }
    currentGraphElement.hook.push(item)
    Imitation.state.graphEvent.push({ eventType: 'hook', elementId: currentGraphElement.id, eventId: item.id, translateX: 0, translateY: 0 })
    Imitation.assignState({ graphContentUpdate: hash(), graphEventUpdate: hash() })
  }

  const handleChange = (index, value, update) => {
    setDialog(undefined)
    currentGraphElement.hook[index] = value
    Imitation.assignState({ graphContentUpdate: hash(), graphEventUpdate: hash() })
  }

  const handleDelete = (index, value, update) => {
    setDialog(undefined)
    currentGraphElement.hook.splice(index, 1)
    Imitation.state.graphEvent = Imitation.state.graphEvent.filter(i => i.type !== 'hook' || i.elementId !== currentGraphElement.id || i.eventId !== value.id)
    Imitation.assignState({ graphContentUpdate: hash(), graphEventUpdate: hash() })
  }

  return <>
    <Grid container spacing={1}>
      {
        currentGraphElement.hook.map((i, index) => {
          return <Grid item xs={12} key={index}>
            <Paper style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4, paddingLeft: 12 }}>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <span>{convertCamelCase(i.hookType)}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={e => setDialog({ index: index, data: i })}><EditIcon style={{ fontSize: 22 }} /></IconButton>
                <Switch checked={i.use} onChange={e => { i.use = e.target.checked; Imitation.assignState({ graphContentUpdate: hash() }) }} />
              </div>
            </Paper>
          </Grid>
        })
      }
      <Grid item xs={12}>
        <Button variant='outlined' fullWidth style={{ textTransform: 'none' }} onClick={handleAdd}><AddIcon /></Button>
      </Grid>
    </Grid>

    {
      dialog ?
        <HookDialog
          value={dialog.data}
          onChange={(value, update) => handleChange(dialog.index, value, update)}
          onDelete={(value, update) => handleDelete(dialog.index, update)}
          onClose={() => setDialog(undefined)}
        />
        : null
    }
  </>
}

function MonitorConfig(props) {
  const { currentGraphElement } = props

  const [dialog, setDialog] = React.useState()

  if (!currentGraphElement.monitor) return null

  const { information } = React.useMemo(() => graphElementSearch(currentGraphElement.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const handleAdd = () => {
    const item = { id: hash(), use: true, monitorName: hash(), monitorType: 'default', monitorEval: evalEventMonitorDefault, monitorKey: '' }
    currentGraphElement.monitor.push(item)
    Imitation.state.graphEvent.push({ eventType: 'monitor', elementId: currentGraphElement.id, eventId: item.id, translateX: 0, translateY: 0 })
    Imitation.assignState({ graphContentUpdate: hash(), graphEventUpdate: hash() })
  }

  const handleChange = (index, value, update) => {
    setDialog(undefined)
    if (update === true) {
      updateTriggerLink(Imitation.state.graphContent, currentGraphElement.monitor[index].monitorName, value.monitorName)
    }
    currentGraphElement.monitor[index] = value
    Imitation.assignState({ graphContentUpdate: hash(), graphEventUpdate: hash() })
  }

  const handleDelete = (index, value, update) => {
    setDialog(undefined)
    if (update === true) {
      updateTriggerLink(Imitation.state.graphContent, currentGraphElement.monitor[index].monitorName, '')
    }
    currentGraphElement.monitor.splice(index, 1)
    Imitation.state.graphEvent = Imitation.state.graphEvent.filter(i => i.type !== 'monitor' || i.elementId !== currentGraphElement.id || i.eventId !== value.id)
    Imitation.assignState({ graphContentUpdate: hash(), graphEventUpdate: hash() })
  }

  const monitorOptions = [{ value: '_Use', label: 'Use' }, { value: '_Nonuse', label: 'Nonuse' }, ...information.monitor]

  if (!monitorOptions && monitorOptions.length === 0) return null

  return <>
    <Grid container spacing={1}>
      {
        currentGraphElement.monitor.map((i, index) => {
          return <Grid item xs={12} key={index}>
            <Paper style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4, paddingLeft: 12 }}>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <span>{i.monitorName}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={e => setDialog({ index: index, data: i })}><EditIcon style={{ fontSize: 22 }} /></IconButton>
                <Switch checked={i.use} onChange={e => { i.use = e.target.checked; Imitation.assignState({ graphContentUpdate: hash() }) }} />
              </div>
            </Paper>
          </Grid>
        })
      }
      <Grid item xs={12}>
        <Button variant='outlined' fullWidth style={{ textTransform: 'none' }} onClick={handleAdd}><AddIcon /></Button>
      </Grid>
    </Grid>
    {
      dialog ?
        <MonitorDialog
          value={dialog.data}
          onChange={(value, update) => handleChange(dialog.index, value, update)}
          onDelete={(update) => handleDelete(dialog.index, update)}
          onClose={() => setDialog(undefined)}
          monitorOptions={monitorOptions}
        />
        : null
    }
  </>
}

function TriggerConfig(props) {
  const { currentGraphElement } = props

  const [dialog, setDialog] = React.useState()

  if (!currentGraphElement.trigger) return null

  const { information } = React.useMemo(() => graphElementSearch(currentGraphElement.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!information) return null

  const handleAdd = () => {
    const item = { id: hash(), use: true, triggerType: 'default', triggerEval: evalEventMonitorDefault, triggerKey: '', monitorName: '' }
    currentGraphElement.trigger.push(item)
    Imitation.state.graphEvent.push({ eventType: 'trigger', elementId: currentGraphElement.id, eventId: item.id, translateX: 0, translateY: 0 })
    Imitation.assignState({ graphContentUpdate: hash(), graphEventUpdate: hash() })
  }

  const handleChange = (index, value, update) => {
    setDialog(undefined)
    currentGraphElement.trigger[index] = value
    Imitation.assignState({ graphContentUpdate: hash(), graphEventUpdate: hash() })
  }

  const handleDelete = (index, value, update) => {
    setDialog(undefined)
    currentGraphElement.trigger.splice(index, 1)
    Imitation.state.graphEvent = Imitation.state.graphEvent.filter(i => i.type !== 'trigger' || i.elementId !== currentGraphElement.id || i.eventId !== value.id)
    Imitation.assignState({ graphContentUpdate: hash(), graphEventUpdate: hash() })
  }

  const triggerOptions = information.trigger

  const monitorOptionsAll = getMonitorOptionsAll(Imitation.state.graphContent)

  if (!triggerOptions || triggerOptions.length === 0) return null

  return <>
    <Grid container spacing={1}>
      {
        currentGraphElement.trigger.map((i, index) => {
          return <Grid item xs={12} key={index}>
            <Paper style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 4, paddingLeft: 12 }}>
              <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <span>{triggerOptions.find(i_ => i_.value === i.triggerKey) ? triggerOptions.find(i_ => i_.value === i.triggerKey).label : null}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={e => setDialog({ index: index, data: i })}><EditIcon style={{ fontSize: 22 }} /></IconButton>
                <Switch checked={i.use} onChange={e => { i.use = e.target.checked; Imitation.assignState({ graphContentUpdate: hash() }) }} />
              </div>
            </Paper>
          </Grid>
        })
      }
      <Grid item xs={12}>
        <Button variant='outlined' fullWidth style={{ textTransform: 'none' }} onClick={handleAdd}><AddIcon /></Button>
      </Grid>
    </Grid>
    {
      dialog ?
        <TriggerDialog
          value={dialog.data}
          onChange={(v) => handleChange(dialog.index, v)}
          onDelete={() => handleDelete(dialog.index)}
          onClose={() => setDialog(undefined)}
          triggerOptions={triggerOptions}
          monitorOptionsAll={monitorOptionsAll}
        />
        : null
    }
  </>
}

function EventConfigDialog(props) {
  const { element, type, onClose } = props

  return <Dialog onClose={onClose} open={true} sx={{ '& .MuiDialog-paper': { width: 520, maxWidth: 'none' } }} className='font'>
    <DialogContent>
      {
        type === 'hook' ? <HookConfig currentGraphElement={element} /> : null
      }
      {
        type === 'monitor' ? <MonitorConfig currentGraphElement={element} /> : null
      }
      {
        type === 'trigger' ? <TriggerConfig currentGraphElement={element} /> : null
      }
    </DialogContent>
  </Dialog>
}

function HookDialog(props) {
  const { value, onChange, onDelete, onClose } = props

  const [data, setData] = React.useState(value)

  return <Dialog onClose={onClose} open={true} sx={{ '& .MuiDialog-paper': { width: 1080, maxWidth: 'none' } }}>
    <DialogContent>
      <Grid container spacing={2}>

        <Grid item xs={12} className='font'>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Id' disabled value={value.id} />
        </Grid>

        <Grid item xs={12} className='font'>
          <FormControl {...SelectSX} fullWidth>
            <InputLabel>Hook Type</InputLabel>
            <Select {...SelectSX} label='Hook Type' value={data.hookType} onChange={e => setData(Object.assign({}, data, { hookType: e.target.value }))}>
              <MenuItem value='beforeRender'>Before Render</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <ReactAce
            style={{ width: '100%', height: 500, lineHeight: 1.5, fontWeight: 'bold', fontSize: 14, fontFamily: 'monospace' }}
            mode='javascript'
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            enableSnippets={true}
            showPrintMargin={false}
            tabSize={2}
            value={data.hookEval}
            onChange={v => setData(Object.assign({}, data, { hookEval: v }))}
          />
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='font'>
          <div>Use</div>
          <Switch checked={data.use} onChange={e => setData(Object.assign({}, data, { use: e.target.checked }))} />
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions className='font'>
      <Button style={{ textTransform: 'none' }} variant='contained' color='error' onClick={() => onDelete(data)}>Delete</Button>
      <Button style={{ textTransform: 'none' }} variant='contained' onClick={() => onChange(data)}>Save</Button>
    </DialogActions>
  </Dialog >
}

function MonitorDialog(props) {
  const { monitorOptions, value, onChange, onDelete, onClose } = props

  const [update, setUpdate] = React.useState(true)
  const [data, setData] = React.useState(value)

  return <Dialog onClose={onClose} open={true} sx={{ '& .MuiDialog-paper': { width: data.monitorType === 'default' ? 720 : 1080, maxWidth: 'none' } }}>
    <DialogContent>
      <Grid container spacing={2}>

        <Grid item xs={12} className='font'>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Id' disabled value={value.id} />
        </Grid>

        <Grid item xs={12} className='font'>
          <TextField {...TextFieldSX} fullWidth value={data.monitorName} label='Monitor Name' onChange={e => setData(Object.assign({}, data, { monitorName: e.target.value }))} />
        </Grid>

        <Grid item xs={12} className='font'>
          <FormControl {...SelectSX} fullWidth>
            <InputLabel>Monitor Type</InputLabel>
            <Select {...SelectSX} label='Monitor Type' value={data.monitorType} onChange={e => setData(Object.assign({}, data, { monitorType: e.target.value }))}>
              <MenuItem value='default'>Default</MenuItem>
              <MenuItem value='eval'>Eval</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {
          data.monitorType === 'default' ?
            <>
              <Grid item xs={12} className='font'>
                <FormControl {...SelectSX} fullWidth>
                  <InputLabel>Monitor Key</InputLabel>
                  <Select {...SelectSX} label='Monitor Key' value={data.monitorKey} onChange={e => setData(Object.assign({}, data, { monitorKey: e.target.value }))}>
                    {
                      monitorOptions.map((i, index) => {
                        return <MenuItem key={index} value={i.value}>{i.label}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
              </Grid>
            </>
            : null
        }

        {
          data.monitorType === 'eval' ?
            <>
              <Grid item xs={12}>
                <ReactAce
                  style={{ width: '100%', height: 500, lineHeight: 1.5, fontWeight: 'bold', fontSize: 14, fontFamily: 'monospace' }}
                  mode='javascript'
                  enableBasicAutocompletion={true}
                  enableLiveAutocompletion={true}
                  enableSnippets={true}
                  showPrintMargin={false}
                  tabSize={2}
                  value={data.monitorEval}
                  onChange={v => setData(Object.assign({}, data, { monitorEval: v }))}
                />
              </Grid>
            </>
            : null
        }

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='font'>
          <div>Use</div>
          <Switch checked={data.use} onChange={e => setData(Object.assign({}, data, { use: e.target.checked }))} />
        </Grid>

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }} className='font'>
          <div>Update Trigger Link</div>
          <Switch checked={update} onChange={e => setUpdate(e.target.checked)} />
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions className='font'>
      <Button style={{ textTransform: 'none' }} variant='contained' color='error' onClick={() => onDelete(data, update)}>Delete</Button>
      <Button style={{ textTransform: 'none' }} variant='contained' onClick={() => onChange(data, update)}>Save</Button>
    </DialogActions>
  </Dialog >
}

function TriggerDialog(props) {
  const { triggerOptions, value, onChange, onDelete, onClose, monitorOptionsAll } = props

  const [data, setData] = React.useState(value)

  return <Dialog onClose={onClose} open={true} sx={{ '& .MuiDialog-paper': { width: data.triggerType === 'default' ? 720 : 1080, maxWidth: 'none' } }}>
    <DialogContent>
      <Grid container spacing={2}>

        <Grid item xs={12} className='font'>
          <TextField {...TextFieldSX} fullWidth autoComplete='off' label='Id' disabled value={value.id} />
        </Grid>

        <Grid item xs={12} className='font'>
          <FormControl {...SelectSX} fullWidth>
            <InputLabel>Link Monitor Name</InputLabel>
            <Select {...SelectSX} label='Link Monitor Name' value={data.monitorName} onChange={e => setData(Object.assign({}, data, { monitorName: e.target.value }))}>
              {
                [...new Set(monitorOptionsAll.map(i => i.monitorName))].map((i, index) => {
                  return <MenuItem key={index} value={i}>{i}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} className='font'>
          <FormControl {...SelectSX} fullWidth>
            <InputLabel>Trigger Key</InputLabel>
            <Select {...SelectSX} label='Trigger Key' value={data.triggerKey} onChange={e => setData(Object.assign({}, data, { triggerKey: e.target.value }))}>
              {
                triggerOptions.map((i, index) => {
                  return <MenuItem key={index} value={i.value}>{i.label}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} className='font'>
          <FormControl {...SelectSX} fullWidth>
            <InputLabel>Trigger Type</InputLabel>
            <Select {...SelectSX} label='Trigger Type' value={data.triggerType} onChange={e => setData(Object.assign({}, data, { triggerType: e.target.value }))}>
              <MenuItem value='default'>Default</MenuItem>
              <MenuItem value='eval'>Eval</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {
          data.triggerType === 'eval' ?
            <>
              <Grid item xs={12}>
                <ReactAce
                  style={{ width: '100%', height: 500, lineHeight: 1.5, fontWeight: 'bold', fontSize: 14, fontFamily: 'monospace' }}
                  mode='javascript'
                  enableBasicAutocompletion={true}
                  enableLiveAutocompletion={true}
                  enableSnippets={true}
                  showPrintMargin={false}
                  tabSize={2}
                  value={data.triggerEval}
                  onChange={v => setData(Object.assign({}, data, { triggerEval: v }))}
                />
              </Grid>
            </>
            : null
        }

        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className='font'>
          <div>Use</div>
          <Switch checked={data.use} onChange={e => setData(Object.assign({}, data, { use: e.target.checked }))} />
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions className='font'>
      <Button style={{ textTransform: 'none' }} variant='contained' color='error' onClick={() => onDelete(data)}>Delete</Button>
      <Button style={{ textTransform: 'none' }} variant='contained' onClick={() => onChange(data)}>Save</Button>
    </DialogActions>
  </Dialog>
}

function EventDialog(props) {
  const { type } = props

  return <>
    {
      type === 'hook' ? <HookDialog {...props} /> : null
    }
    {
      type === 'monitor' ? <MonitorDialog {...props} /> : null
    }
    {
      type === 'trigger' ? <TriggerDialog {...props} /> : null
    }
  </>
}

export { HookConfig, MonitorConfig, TriggerConfig, EventConfigDialog, HookDialog, MonitorDialog, TriggerDialog, EventDialog }