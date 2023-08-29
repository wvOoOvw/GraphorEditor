import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Switch } from '@mui/material'
import { Divider } from '@mui/material'
import { Button } from '@mui/material'

function Edit(props) {
  const { element, property, style, update, component, sx, sendMessage } = props

  return <>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Value' value={property.value} onChange={e => { property.value = e.target.value; update() }} />
      </Grid>
      <Grid item xs={12}>
        <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Href' value={property.href} onChange={e => { property.href = e.target.value; update() }} />
      </Grid>
      <Grid item xs={12}>
        <FormControl {...sx.SelectSX} fullWidth>
          <InputLabel>Variant</InputLabel>
          <Select {...sx.SelectSX} value={property.variant} label='Variant' onChange={e => { property.variant = e.target.value; update() }}>
            <MenuItem value='text'>Text</MenuItem>
            <MenuItem value='outlined'>Outlined</MenuItem>
            <MenuItem value='contained'>Contained</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl {...sx.SelectSX} fullWidth>
          <InputLabel>Color</InputLabel>
          <Select {...sx.SelectSX} value={property.color} label='Color' onChange={e => { property.color = e.target.value; update() }}>
            <MenuItem value='primary'>Primary</MenuItem>
            <MenuItem value='inherit'>Inherit</MenuItem>
            <MenuItem value='secondary'>Secondary</MenuItem>
            <MenuItem value='success'>Success</MenuItem>
            <MenuItem value='error'>Error</MenuItem>
            <MenuItem value='info'>Info</MenuItem>
            <MenuItem value='warning'>Warning</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>Disabled</div>
        <Switch checked={property.disabled} onChange={e => { property.disabled = e.target.checked; update() }} />
      </Grid>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>Full Width</div>
        <Switch checked={property.fullWidth} onChange={e => { property.fullWidth = e.target.checked; update() }} />
      </Grid>
    </Grid>
  </>
}

export default Edit