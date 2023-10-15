import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Switch } from '@mui/material'

function Edit(props) {
  const { element, property, style, update, component, sx, sendMessage } = props

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Src' value={property.src} onChange={e => { property.property.src = e.target.value; update(); update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Controls</div>
      <Switch checked={property.controls} onChange={(e) => { property.controls = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Autoplay</div>
      <Switch checked={property.autoplay} onChange={(e) => { property.autoplay = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Loop</div>
      <Switch checked={property.loop} onChange={(e) => { property.loop = e.target.checked; update() }} />
    </Grid>
  </Grid>
}

export default Edit