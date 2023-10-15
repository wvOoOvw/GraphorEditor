import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'

function Edit(props) {
  const { element, property, style, update, component, sx, sendMessage } = props

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Size' value={property.size} onChange={e => { property.size = e.target.value; update() }} type='number' />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Thickness' value={property.thickness} onChange={e => { property.thickness = e.target.value; update() }} type='number' />
    </Grid>
  </Grid>
}

export default Edit