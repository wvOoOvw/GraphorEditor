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
import { Accordion } from '@mui/material'
import { AccordionSummary } from '@mui/material'
import { AccordionDetails } from '@mui/material'

import { AceDialog } from './View.Component.Ace'

import { evalEventMonitorDefault, evalEventTriggerDefault } from './utils.const'
import { TooltipSX, TextFieldSX, AutocompleteSX, SelectSX } from './utils.mui.sx'

function MonitorDialog(props) {
  const { keyOptions, value, onChange, onDelete, onClose } = props

  const [data, setData] = React.useState(value)
  const [aceDialog, setAceDialog] = React.useState(false)

  const handleClickEval = () => {
    if (data.useEval) {
      setAceDialog(true)
    } else {
      setData(Object.assign({}, data, { useEval: true }))
    }
  }

  return <Dialog onClose={onClose} open={true} sx={{ '& .MuiDialog-paper': { width: 720, maxWidth: 'none' } }} className='font'>
    <DialogContent>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <TextField {...TextFieldSX} fullWidth value={data.name} label='Custom Name' onChange={e => setData(Object.assign({}, data, { name: e.target.value }))} />
        </Grid>

        <Grid item xs={12}>
          <Accordion defaultExpanded={false}>
            <AccordionSummary>Execute Function</AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item>
                  <Button style={{ textTransform: 'none' }} variant={data.useEval ? 'contained' : 'text'} color='secondary' onClick={handleClickEval}>
                    Custom Function
                  </Button>
                </Grid>
                {
                  keyOptions.map((i, index) => {
                    return <Grid item key={index}>
                      <Button style={{ textTransform: 'none' }} key={index} variant={!data.useEval && data.key === i.value ? 'contained' : 'text'} onClick={() => setData(Object.assign({}, data, { key: i.value, useEval: false }))}>
                        {
                          i.label
                        }
                      </Button>
                    </Grid>
                  })
                }
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button style={{ textTransform: 'none' }} variant='contained' color='error' onClick={() => onDelete()}>Delete</Button>
      <Button style={{ textTransform: 'none' }} variant='contained' onClick={() => onChange(data)}>Save</Button>
    </DialogActions>

    {
      aceDialog ?
        <AceDialog
          value={data.event}
          onChange={e => { setData(Object.assign({}, data, { event: e })); setAceDialog(false) }}
          onClose={() => setAceDialog(false)} initValue={evalEventMonitorDefault}
          mode='javascript'
        /> : null
    }
  </Dialog>
}

function TriggerDialog(props) {
  const { keyOptions, value, onChange, onDelete, onClose, monitorNameOptions } = props

  const [data, setData] = React.useState(value)
  const [aceDialog, setAceDialog] = React.useState(false)

  const handleClickEval = () => {
    if (data.useEval) {
      setAceDialog(true)
    } else {
      setData(Object.assign({}, data, { useEval: true }))
    }
  }

  return <Dialog onClose={onClose} open={true} sx={{ '& .MuiDialog-paper': { width: 720, maxWidth: 'none' } }} className='font'>
    <DialogContent>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <FormControl {...SelectSX} fullWidth>
            <InputLabel>Link Monitor</InputLabel>
            <Select {...SelectSX} label='Link Monitor' value={data.name} onChange={e => setData(Object.assign({}, data, { name: e.target.value }))}>
              {
                monitorNameOptions.map(i => {
                  return <MenuItem key={i} value={i}>{i}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Accordion defaultExpanded={false}>
            <AccordionSummary>Execute Function</AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                <Grid item>
                  <Button style={{ textTransform: 'none' }} variant={data.useEval ? 'contained' : 'text'} onClick={handleClickEval}>
                    Custom Function
                  </Button>
                </Grid>
                <Grid item>
                  <Button style={{ textTransform: 'none' }} variant={!data.useEval ? 'contained' : 'text'} onClick={() => setData(Object.assign({}, data, { useEval: false }))}>
                    Default
                  </Button>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12}>
          <Accordion defaultExpanded={false}>
            <AccordionSummary>Trigger Time</AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                {
                  keyOptions.map((i, index) => {
                    return <Grid item key={index}>
                      <Button style={{ textTransform: 'none' }} key={index} variant={data.key === i.value ? 'contained' : 'text'} onClick={() => setData(Object.assign({}, data, { key: i.value }))}>
                        {
                          i.label
                        }
                      </Button>
                    </Grid>
                  })
                }
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </DialogContent>
    <DialogActions>
      <Button style={{ textTransform: 'none' }} variant='contained' color='error' onClick={() => onDelete()}>Delete</Button>
      <Button style={{ textTransform: 'none' }} variant='contained' onClick={() => onChange(data)}>Save</Button>
    </DialogActions>

    {
      aceDialog ?
        <AceDialog
          value={data.event}
          onChange={e => { setData(Object.assign({}, data, { event: e })); setAceDialog(false) }}
          onClose={() => setAceDialog(false)} initValue={evalEventTriggerDefault}
          mode='javascript'
        /> : null
    }
  </Dialog>
}

export { MonitorDialog, TriggerDialog }