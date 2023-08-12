import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Switch } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  return <Grid container spacing={2}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>禁用</div>
      <Switch checked={value.disabled} onChange={e => onChange(Object.assign({}, value, { disabled: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>默认展开</div>
      <Switch checked={value.expanded} onChange={e => onChange(Object.assign({}, value, { expanded: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>显示图标</div>
      <Switch checked={value.expandIcon} onChange={e => onChange(Object.assign({}, value, { expandIcon: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>显示分割线</div>
      <Switch checked={value.divider} onChange={e => onChange(Object.assign({}, value, { divider: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField fullWidth label='标题' value={value.title} onChange={e => onChange(Object.assign({}, value, { title: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField fullWidth label='标题高度' value={value.summaryHeight} onChange={e => onChange(Object.assign({}, value, { summaryHeight: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField fullWidth label='内容高度' value={value.detailsHeight} onChange={e => onChange(Object.assign({}, value, { detailsHeight: e.target.value }))} />
    </Grid>
  </Grid>
}

export default Edit