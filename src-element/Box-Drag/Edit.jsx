import React from 'react'

import { Grid } from '@mui/material'
import { Switch } from '@mui/material'

function Edit(props) {
  const { element, property, style, update, component, sx, sendMessage } = props

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Draggable</div>
      <Switch checked={property.draggable} onChange={e => { property.draggable = e.target.checked; update() }} />
    </Grid>
  </Grid >
}

export default Edit