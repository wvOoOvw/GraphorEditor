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
      <div>Disabled</div>
      <Switch checked={element.property.disabled} onChange={e => { element.property.disabled = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' type='number' label='Value' value={element.property.value} onChange={e => { element.property.value = e.target.value; update() }} />
    </Grid>
    <Grid item xs={4}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' type='number' label='Min' value={element.property.min} onChange={e => { element.property.min = e.target.value; update() }} />
    </Grid>
    <Grid item xs={4}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' type='number' label='Max' value={element.property.max} onChange={e => { element.property.max = e.target.value; update() }} />
    </Grid>
    <Grid item xs={4}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' type='number' label='Step' value={element.property.step} onChange={e => { element.property.step = e.target.value; update() }} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Color</InputLabel>
        <Select {...sx.SelectSX} value={element.property.color} label='Color' onChange={e => { element.property.color = e.target.value; update() }}>
          <MenuItem value='primary'>Primary</MenuItem>
          <MenuItem value='secondary'>Secondary</MenuItem>
          <MenuItem value='success'>Success</MenuItem>
          <MenuItem value='error'>Error</MenuItem>
          <MenuItem value='info'>Info</MenuItem>
          <MenuItem value='warning'>Warning</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Size</InputLabel>
        <Select {...sx.SelectSX} value={element.property.size} label='Size' onChange={e => { element.property.size = e.target.value; update() }}>
          <MenuItem value='medium'>Medium</MenuItem>
          <MenuItem value='small'>Small</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Value Label Display</InputLabel>
        <Select {...sx.SelectSX} value={element.property.valueLabelDisplay} label='Value Label Display' onChange={e => { element.property.valueLabelDisplay = e.target.value; update() }}>
          <MenuItem value='auto'>Auto</MenuItem>
          <MenuItem value='on'>On</MenuItem>
          <MenuItem value='off'>Off</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
}

export default Edit