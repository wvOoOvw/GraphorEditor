import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth label='Content' value={value.content} onChange={e => onChange(Object.assign({}, value, { content: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Variant</InputLabel>
        <Select {...sx.SelectSX} value={value.variant} label='Variant' onChange={e => onChange(Object.assign({}, value, { variant: e.target.value }))}>
          <MenuItem value='standard'>Standard</MenuItem>
          <MenuItem value='dot'>Dot</MenuItem>
        </Select>
      </FormControl>
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
    <Grid item xs={6}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Horizontal Position</InputLabel>
        <Select {...sx.SelectSX} value={value.anchorOrigin.horizontal} label='Horizontal Position' onChange={e => onChange((v) => v.anchorOrigin.horizontal = e.target.value)}>
          <MenuItem value='left'>Left</MenuItem>
          <MenuItem value='right'>Right</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Vertical Position</InputLabel>
        <Select {...sx.SelectSX} value={value.anchorOrigin.vertical} label='Vertical Position' onChange={e => onChange((v) => v.anchorOrigin.vertical = e.target.value)}>
          <MenuItem value='top'>Top</MenuItem>
          <MenuItem value='bottom'>Bottom</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
}

export default Edit