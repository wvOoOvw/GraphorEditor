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
    <Grid item xs={6}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' type='number' label='Count' value={value.count} onChange={e => onChange(Object.assign({}, value, { count: e.target.value }))} />
    </Grid>
    <Grid item xs={6}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' type='number' label='Page' value={value.page} onChange={e => onChange(Object.assign({}, value, { page: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Variant</InputLabel>
        <Select {...sx.SelectSX} value={value.variant} label='Variant' onChange={e => onChange(Object.assign({}, value, { variant: e.target.value }))}>
          <MenuItem value='text'>Text</MenuItem>
          <MenuItem value='outlined'>Outlined</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Shape</InputLabel>
        <Select {...sx.SelectSX} value={value.shape} label='Shape' onChange={e => onChange(Object.assign({}, value, { shape: e.target.value }))}>
          <MenuItem value='rounded'>Rounded</MenuItem>
          <MenuItem value='circular'>Circular</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Color</InputLabel>
        <Select {...sx.SelectSX} value={value.color} label='Color' onChange={e => onChange(Object.assign({}, value, { color: e.target.value }))}>
          <MenuItem value='standard'>Standard</MenuItem>
          <MenuItem value='primary'>Primary</MenuItem>
          <MenuItem value='secondary'>Secondary</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Size</InputLabel>
        <Select {...sx.SelectSX} value={value.size} label='Size' onChange={e => onChange(Object.assign({}, value, { size: e.target.value }))}>
          <MenuItem value='large'>Large</MenuItem>
          <MenuItem value='medium'>Medium</MenuItem>
          <MenuItem value='small'>Small</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid >
}

export default Edit