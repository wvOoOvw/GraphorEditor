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
      <div>Disabled</div>
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
        <InputLabel>Color</InputLabel>
        <Select {...sx.SelectSX} value={value.color} label='Color' onChange={e => onChange(Object.assign({}, value, { color: e.target.value }))}>
          <MenuItem value='primary'>Primary</MenuItem>
          <MenuItem value='secondary'>Secondary</MenuItem>
          <MenuItem value='success'>Success</MenuItem>
          <MenuItem value='error'>Error</MenuItem>
          <MenuItem value='info'>Info</MenuItem>
          <MenuItem value='warning'>Warning</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Size</InputLabel>
        <Select {...sx.SelectSX} value={value.size} label='Size' onChange={e => onChange(Object.assign({}, value, { size: e.target.value }))}>
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