import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Switch } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>打开</div>
      <Switch checked={value.open} onChange={e => onChange(v => v.open = e.target.checked)} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>显示箭头</div>
      <Switch checked={value.arrow} onChange={e => onChange(v => v.arrow = e.target.checked)} />
    </Grid>
    <Grid item xs={6}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>浮窗位置</InputLabel>
        <Select {...sx.SelectSX} value={value.placementPosition} label='浮窗位置' onChange={e => onChange((v) => v.placementPosition = e.target.value)}>
          <MenuItem value='bottom'>下</MenuItem>
          <MenuItem value='left'>左</MenuItem>
          <MenuItem value='right'>右</MenuItem>
          <MenuItem value='top'>上</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>浮窗排列位置</InputLabel>
        <Select {...sx.SelectSX} value={value.placementAlign} label='浮窗排列位置' onChange={e => onChange((v) => v.placementAlign = e.target.value)}>
          <MenuItem value='center'>居中</MenuItem>
          <MenuItem value='start'>居左</MenuItem>
          <MenuItem value='end'>居右</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='延迟显示浮窗' value={value.enterDelay} onChange={e => onChange((value) => value.enterDelay = e.target.value)} type='number' />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='延迟隐藏浮窗' value={value.leaveDelay} onChange={e => onChange((value) => value.leaveDelay = e.target.value)} type='number' />
    </Grid>
  </Grid>
}

export default Edit