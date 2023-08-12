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

  return <Grid container spacing={2}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>禁用</div>
      <Switch checked={value.disabled} onChange={e => onChange(Object.assign({}, value, { disabled: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth type='number' label='默认值' value={value.value} onChange={e => onChange(Object.assign({}, value, { value: e.target.value }))} />
    </Grid>
    <Grid item xs={4}>
      <TextField {...sx.TextFieldSX} fullWidth type='number' label='最小值' value={value.min} onChange={e => onChange(Object.assign({}, value, { min: e.target.value }))} />
    </Grid>
    <Grid item xs={4}>
      <TextField {...sx.TextFieldSX} fullWidth type='number' label='最大值' value={value.max} onChange={e => onChange(Object.assign({}, value, { max: e.target.value }))} />
    </Grid>
    <Grid item xs={4}>
      <TextField {...sx.TextFieldSX} fullWidth type='number' label='间距' value={value.step} onChange={e => onChange(Object.assign({}, value, { step: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>主题颜色</InputLabel>
        <Select {...sx.SelectSX} value={value.color} label='主题颜色' onChange={e => onChange(Object.assign({}, value, { color: e.target.value }))}>
          {
            ['primary', 'secondary', 'success', 'error', 'info', 'warning'].map(i => {
              return <MenuItem key={i} value={i}>{i}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>尺寸</InputLabel>
        <Select {...sx.SelectSX} value={value.size} label='尺寸' onChange={e => onChange(Object.assign({}, value, { size: e.target.value }))}>
          <MenuItem value='medium'>中</MenuItem>
          <MenuItem value='small'>小</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>浮标</InputLabel>
        <Select {...sx.SelectSX} value={value.valueLabelDisplay} label='浮标' onChange={e => onChange(Object.assign({}, value, { valueLabelDisplay: e.target.value }))}>
          <MenuItem value='auto'>使用时打开</MenuItem>
          <MenuItem value='on'>打开</MenuItem>
          <MenuItem value='off'>关闭</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
}

export default Edit