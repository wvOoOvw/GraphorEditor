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

import ReactAce from 'react-ace'

import { TooltipSX, TextFieldSX, AutocompleteSX, SelectSX } from './utils.mui.sx'

function HookDialog(props) {
  const { value, onChange, onDelete, onClose } = props

  const [data, setData] = React.useState(value)

  return <Dialog onClose={onClose} open={true} sx={{ '& .MuiDialog-paper': { width: 1080, maxWidth: 'none' } }}>
    <DialogContent>
      <Grid container spacing={2}>

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

      </Grid>
    </DialogContent>
    <DialogActions className='font'>
      <Button style={{ textTransform: 'none' }} variant='contained' color='error' onClick={() => onDelete()}>Delete</Button>
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
          <div>Update Trigger Link</div>
          <Switch checked={update} onChange={e => setUpdate(e.target.checked)} />
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions className='font'>
      <Button style={{ textTransform: 'none' }} variant='contained' color='error' onClick={() => onDelete(update)}>Delete</Button>
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
      </Grid>
    </DialogContent>
    <DialogActions className='font'>
      <Button style={{ textTransform: 'none' }} variant='contained' color='error' onClick={() => onDelete()}>Delete</Button>
      <Button style={{ textTransform: 'none' }} variant='contained' onClick={() => onChange(data)}>Save</Button>
    </DialogActions>
  </Dialog>
}

export { HookDialog, MonitorDialog, TriggerDialog }