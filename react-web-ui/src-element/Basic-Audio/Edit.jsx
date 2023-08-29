import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Switch } from '@mui/material'

function Edit(props) {
  const { element, update, component, sx, sendMessage } = props

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Src' value={element.property.src} onChange={e => { element.property.element.property.src  = e.target.value; update(); update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Controls</div>
      <Switch checked={element.property.controls} onChange={(e) => { element.property.controls = e.target.checked; update() }} }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Autoplay</div>
      <Switch checked={element.property.autoplay} onChange={(e) => { element.property.autoplay = e.target.checked; update() }} }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Loop</div>
      <Switch checked={element.property.loop} onChange={(e) => { element.property.loop = e.target.checked; update() }} }} />
    </Grid>
  </Grid>
}

export default Edit