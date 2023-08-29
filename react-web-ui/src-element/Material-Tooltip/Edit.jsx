import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Switch } from '@mui/material'

function Edit(props) {
  const { element, update, component, sx, sendMessage } = props

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Open</div>
      <Switch checked={value.open} onChange={e => onChange(v => v.open = e.target.checked)} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Arrow</div>
      <Switch checked={value.arrow} onChange={e => onChange(v => v.arrow = e.target.checked)} />
    </Grid>
    <Grid item xs={6}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Placement Position</InputLabel>
        <Select {...sx.SelectSX} value={value.placementPosition} label='Placement Position' onChange={e => onChange((v) => v.placementPosition = e.target.value)}>
          <MenuItem value='bottom'>Bottom</MenuItem>
          <MenuItem value='left'>Left</MenuItem>
          <MenuItem value='right'>Right</MenuItem>
          <MenuItem value='top'>TOP</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Placement Align</InputLabel>
        <Select {...sx.SelectSX} value={value.placementAlign} label='Placement Align' onChange={e => onChange((v) => v.placementAlign = e.target.value)}>
          <MenuItem value='center'>Center</MenuItem>
          <MenuItem value='start'>Start</MenuItem>
          <MenuItem value='end'>End</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Enter Delay' value={value.enterDelay} onChange={e => onChange((value) => value.enterDelay = e.target.value)} type='number' />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Leave Delay' value={value.leaveDelay} onChange={e => onChange((value) => value.leaveDelay = e.target.value)} type='number' />
    </Grid>
  </Grid>
}

export default Edit