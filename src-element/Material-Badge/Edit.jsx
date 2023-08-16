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
      <TextField {...sx.TextFieldSX} fullWidth label='内容' value={value.content} onChange={e => onChange(Object.assign({}, value, { content: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>类型</InputLabel>
        <Select {...sx.SelectSX} value={value.variant} label='类型' onChange={e => onChange(Object.assign({}, value, { variant: e.target.value }))}>
          <MenuItem value='standard'>数字</MenuItem>
          <MenuItem value='dot'>原点</MenuItem>
        </Select>
      </FormControl>
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
    <Grid item xs={6}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>水平位置</InputLabel>
        <Select {...sx.SelectSX} value={value.anchorOrigin.horizontal} label='水平位置' onChange={e => onChange((v) => v.anchorOrigin.horizontal = e.target.value)}>
          <MenuItem value='left'>左</MenuItem>
          <MenuItem value='right'>右</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>垂直位置</InputLabel>
        <Select {...sx.SelectSX} value={value.anchorOrigin.vertical} label='水平位置' onChange={e => onChange((v) => v.anchorOrigin.vertical = e.target.value)}>
          <MenuItem value='top'>上</MenuItem>
          <MenuItem value='bottom'>下</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
}

export default Edit