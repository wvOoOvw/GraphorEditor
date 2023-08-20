import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Size' value={value.size} onChange={e => onChange(Object.assign({}, value, { size: e.target.value }))} type='number' />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Thickness' value={value.thickness} onChange={e => onChange(Object.assign({}, value, { thickness: e.target.value }))} type='number' />
    </Grid>
  </Grid>
}

export default Edit