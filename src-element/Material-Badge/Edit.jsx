import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'

function Edit(props) {
  const { value, onChange } = props

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField fullWidth label='内容' value={value.content} onChange={e => onChange(Object.assign({}, value, { content: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>类型</InputLabel>
        <Select value={value.variant} label='类型' onChange={e => onChange(Object.assign({}, value, { variant: e.target.value }))}>
          <MenuItem value='standard'>数字</MenuItem>
          <MenuItem value='dot'>原点</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>主题颜色</InputLabel>
        <Select value={value.color} label='主题颜色' onChange={e => onChange(Object.assign({}, value, { color: e.target.value }))}>
          {
            ['primary', 'secondary', 'success', 'error', 'info', 'warning'].map(i => {
              return <MenuItem key={i} value={i}>{i}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <FormControl fullWidth>
        <InputLabel>水平位置</InputLabel>
        <Select value={value.anchorOrigin.horizontal} label='水平位置' onChange={e => onChange((v) => v.anchorOrigin.horizontal = e.target.value)}>
          <MenuItem value='left'>左</MenuItem>
          <MenuItem value='right'>右</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <FormControl fullWidth>
        <InputLabel>垂直位置</InputLabel>
        <Select value={value.anchorOrigin.vertical} label='水平位置' onChange={e => onChange((v) => v.anchorOrigin.vertical = e.target.value)}>
          <MenuItem value='top'>上</MenuItem>
          <MenuItem value='bottom'>下</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
}

export default Edit