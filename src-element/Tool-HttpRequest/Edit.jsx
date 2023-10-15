import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'

function Edit(props) {
  const { element, property, style, update, component, sx, sendMessage } = props

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Mode</InputLabel>
        <Select {...sx.SelectSX} value={property.mode} label='Mode' onChange={e => { property.mode = e.target.value; update() }}>
          <MenuItem value='fetch'>Fetch</MenuItem>
          <MenuItem value='xhr'>Xhr</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Method</InputLabel>
        <Select {...sx.SelectSX} value={property.method} label='Method' onChange={e => { property.method = e.target.value; update() }}>
          <MenuItem value='get'>Get</MenuItem>
          <MenuItem value='post'>Post</MenuItem>
          <MenuItem value='delete'>Delete</MenuItem>
          <MenuItem value='put'>Put</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Body Type</InputLabel>
        <Select {...sx.SelectSX} value={property.bodyType} label='Body Type' onChange={e => { property.bodyType = e.target.value; update() }}>
          <MenuItem value='json'>Json</MenuItem>
          <MenuItem value='formdata'>Formdata</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Base Url' value={property.baseUrl} onChange={e => { property.baseUrl = e.target.value; update() }} />
    </Grid>
  </Grid>
}

export default Edit