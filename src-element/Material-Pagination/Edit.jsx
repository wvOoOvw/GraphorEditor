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
    <Grid item xs={6}>
      <TextField {...sx.TextFieldSX} fullWidth type='number' label='默认页数' value={value.count} onChange={e => onChange(Object.assign({}, value, { count: e.target.value }))} />
    </Grid>
    <Grid item xs={6}>
      <TextField {...sx.TextFieldSX} fullWidth type='number' label='默认页码' value={value.page} onChange={e => onChange(Object.assign({}, value, { page: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>类型</InputLabel>
        <Select {...sx.SelectSX} value={value.variant} label='类型' onChange={e => onChange(Object.assign({}, value, { variant: e.target.value }))}>
          <MenuItem value='text'>文字</MenuItem>
          <MenuItem value='outlined'>边线</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>形状</InputLabel>
        <Select {...sx.SelectSX} value={value.shape} label='形状' onChange={e => onChange(Object.assign({}, value, { shape: e.target.value }))}>
          <MenuItem value='rounded'>方形</MenuItem>
          <MenuItem value='circular'>圆形</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Color</InputLabel>
        <Select {...sx.SelectSX} value={value.color} label='Color' onChange={e => onChange(Object.assign({}, value, { color: e.target.value }))}>
          {
            ['standard', 'primary', 'secondary'].map(i => {
              return <MenuItem key={i} value={i}>{i}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Size</InputLabel>
        <Select {...sx.SelectSX} value={value.size} label='Size' onChange={e => onChange(Object.assign({}, value, { size: e.target.value }))}>
          <MenuItem value='large'>大</MenuItem>
          <MenuItem value='medium'>中</MenuItem>
          <MenuItem value='small'>小</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid >
}

export default Edit