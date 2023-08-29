import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'

function Edit(props) {
  const { element, update, component, sx, sendMessage } = props

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Size' value={element.property.size} onChange={e => { element.property.size = e.target.value; update() }} type='number' />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Thickness' value={element.property.thickness} onChange={e => { element.property.thickness = e.target.value; update() }} type='number' />
    </Grid>
  </Grid>
}

export default Edit