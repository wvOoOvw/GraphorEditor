import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'

function Edit(props) {
  const { element, update, component, sx, sendMessage } = props

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Src' value={value.src} onChange={e => onChange(Object.assign({}, value, { src: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Alt' value={value.alt} onChange={e => onChange(Object.assign({}, value, { alt: e.target.value }))} />
    </Grid>
  </Grid>
}


export default Edit