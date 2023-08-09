import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Switch } from '@mui/material'

function Edit(props) {
  const { value, onChange } = props

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField fullWidth label='音频地址' value={value.src} onChange={e => onChange(Object.assign({}, value, { src: e.target.value }))} multiline maxRows={4} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>显示操作面板</div>
      <Switch checked={value.controls} onChange={(e) => onChange(Object.assign({}, value, { controls: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>自动播放</div>
      <Switch checked={value.autoplay} onChange={(e) => onChange(Object.assign({}, value, { autoplay: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>循环播放</div>
      <Switch checked={value.loop} onChange={(e) => onChange(Object.assign({}, value, { loop: e.target.checked }))} />
    </Grid>
  </Grid>
}

export default Edit