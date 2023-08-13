import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>请求模式</InputLabel>
        <Select {...sx.SelectSX} value={value.mode} label='请求模式' onChange={e => onChange(Object.assign({}, value, { mode: e.target.value }))}>
          <MenuItem value='fetch'>Fetch</MenuItem>
          <MenuItem value='xhr'>Xhr</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>请求方式</InputLabel>
        <Select {...sx.SelectSX} value={value.method} label='请求方式' onChange={e => onChange(Object.assign({}, value, { method: e.target.value }))}>
          <MenuItem value='get'>Get</MenuItem>
          <MenuItem value='post'>Post</MenuItem>
          <MenuItem value='delete'>Delete</MenuItem>
          <MenuItem value='put'>Put</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>请求体格式</InputLabel>
        <Select {...sx.SelectSX} value={value.bodyType} label='请求体格式' onChange={e => onChange(Object.assign({}, value, { bodyType: e.target.value }))}>
          <MenuItem value='json'>Json</MenuItem>
          <MenuItem value='formdata'>Formdata</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth label='基础Url' value={value.baseUrl} onChange={e => onChange(Object.assign({}, value, { baseUrl: e.target.value }))} />
    </Grid>
  </Grid>
}

export default Edit