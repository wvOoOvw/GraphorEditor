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
      <Switch checked={value.disabled} onChange={e => onChange(Object.assign({}, value, { disabled: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' type='number' label='Value' value={value.value} onChange={e => onChange(Object.assign({}, value, { value: e.target.value }))} />
    </Grid>
    <Grid item xs={4}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' type='number' label='Min' value={value.min} onChange={e => onChange(Object.assign({}, value, { min: e.target.value }))} />
    </Grid>
    <Grid item xs={4}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' type='number' label='Max' value={value.max} onChange={e => onChange(Object.assign({}, value, { max: e.target.value }))} />
    </Grid>
    <Grid item xs={4}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' type='number' label='Step' value={value.step} onChange={e => onChange(Object.assign({}, value, { step: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Color</InputLabel>
        <Select {...sx.SelectSX} value={value.color} label='Color' onChange={e => onChange(Object.assign({}, value, { color: e.target.value }))}>
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
        <Select {...sx.SelectSX} value={value.size} label='Size' onChange={e => onChange(Object.assign({}, value, { size: e.target.value }))}>
          <MenuItem value='medium'>Medium</MenuItem>
          <MenuItem value='small'>Small</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Value Label Display</InputLabel>
        <Select {...sx.SelectSX} value={value.valueLabelDisplay} label='Value Label Display' onChange={e => onChange(Object.assign({}, value, { valueLabelDisplay: e.target.value }))}>
          <MenuItem value='auto'>Auto</MenuItem>
          <MenuItem value='on'>On</MenuItem>
          <MenuItem value='off'>Off</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
}

export default Edit