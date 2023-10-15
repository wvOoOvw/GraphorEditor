import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Switch } from '@mui/material'

function Edit(props) {
  const { element, property, style, update, component, sx, sendMessage } = props

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Open</div>
      <Switch checked={property.open} onChange={e => { property.open = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Arrow</div>
      <Switch checked={property.arrow} onChange={e => { property.arrow = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={6}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Placement Position</InputLabel>
        <Select {...sx.SelectSX} value={property.placementPosition} label='Placement Position' onChange={e => { property.placementPosition = e.target.value; update() }}>
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
        <Select {...sx.SelectSX} value={property.placementAlign} label='Placement Align' onChange={e => { property.placementAlign = e.target.value; update() }}>
          <MenuItem value='center'>Center</MenuItem>
          <MenuItem value='start'>Start</MenuItem>
          <MenuItem value='end'>End</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Enter Delay' value={property.enterDelay} onChange={e => { property.enterDelay = e.target.value; update() }} type='number' />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Leave Delay' value={property.leaveDelay} onChange={e => { property.leaveDelay = e.target.value; update() }} type='number' />
    </Grid>
  </Grid>
}

export default Edit