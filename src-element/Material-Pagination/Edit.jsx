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
    <Grid item xs={6}>
      <TextField {...sx.TextFieldSX} fullWidth type='number' label='默认页数' value={value.count} onChange={e => onChange(Object.assign({}, value, { count: e.target.value }))} />
    </Grid>
    <Grid item xs={6}>
      <TextField {...sx.TextFieldSX} fullWidth type='number' label='默认页码' value={value.page} onChange={e => onChange(Object.assign({}, value, { page: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>类型</InputLabel>
        <Select value={value.variant} label='类型' onChange={e => onChange(Object.assign({}, value, { variant: e.target.value }))}>
          <MenuItem value='text'>文字</MenuItem>
          <MenuItem value='outlined'>边线</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>形状</InputLabel>
        <Select value={value.shape} label='形状' onChange={e => onChange(Object.assign({}, value, { shape: e.target.value }))}>
          <MenuItem value='rounded'>方形</MenuItem>
          <MenuItem value='circular'>圆形</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>主题颜色</InputLabel>
        <Select value={value.color} label='主题颜色' onChange={e => onChange(Object.assign({}, value, { color: e.target.value }))}>
          {
            ['standard', 'primary', 'secondary'].map(i => {
              return <MenuItem key={i} value={i}>{i}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>尺寸</InputLabel>
        <Select value={value.size} label='尺寸' onChange={e => onChange(Object.assign({}, value, { size: e.target.value }))}>
          <MenuItem value='large'>大</MenuItem>
          <MenuItem value='medium'>中</MenuItem>
          <MenuItem value='small'>小</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid >
}

export default Edit