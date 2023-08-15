import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Switch } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Disabled</div>
      <Switch checked={value.disabled} onChange={e => onChange(Object.assign({}, value, { disabled: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Expanded</div>
      <Switch checked={value.expanded} onChange={e => onChange(Object.assign({}, value, { expanded: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>ExpandIcon</div>
      <Switch checked={value.expandIcon} onChange={e => onChange(Object.assign({}, value, { expandIcon: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Divider</div>
      <Switch checked={value.divider} onChange={e => onChange(Object.assign({}, value, { divider: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth label='Title' value={value.title} onChange={e => onChange(Object.assign({}, value, { title: e.target.value }))} />
    </Grid>
  </Grid>
}

export default Edit