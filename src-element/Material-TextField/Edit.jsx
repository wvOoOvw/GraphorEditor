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

  const handleSetType = e => {
    if (e.type === 'file') onChange((value) => value.value = '')
    onChange((value) => value.type = e.target.value)
  }

  return <Grid container spacing={2}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>禁用</div>
      <Switch checked={value.disabled} onChange={e => onChange(Object.assign({}, value, { disabled: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField fullWidth label='标题' value={value.label} onChange={e => onChange(Object.assign({}, value, { label: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField fullWidth label='默认值' value={value.value} onChange={e => onChange(Object.assign({}, value, { value: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>类型</InputLabel>
        <Select value={value.type} label='类型' onChange={handleSetType}>
          <MenuItem value='text'>文本</MenuItem>
          <MenuItem value='password'>密码</MenuItem>
          <MenuItem value='number'>数字</MenuItem>
          <MenuItem value='file'>文件</MenuItem>
          <MenuItem value='url'>链接</MenuItem>
          <MenuItem value='email'>邮箱</MenuItem>
          <MenuItem value='time'>时间</MenuItem>
          <MenuItem value='date'>日期</MenuItem>
          <MenuItem value='datetime'>日期时间</MenuItem>
          <MenuItem value='datetime-local'>本地时期时间</MenuItem>
          <MenuItem value='week'>周</MenuItem>
          <MenuItem value='month'>月</MenuItem>
          <MenuItem value='color'>颜色</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>样式类型</InputLabel>
        <Select value={value.variant} label='样式类型' onChange={e => onChange(Object.assign({}, value, { variant: e.target.value }))}>
          <MenuItem value='outlined'>边线</MenuItem>
          <MenuItem value='filled'>填充</MenuItem>
          <MenuItem value='standard'>默认</MenuItem>
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
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>尺寸</InputLabel>
        <Select value={value.size} label='尺寸' onChange={e => onChange(Object.assign({}, value, { size: e.target.value }))}>
          <MenuItem value='medium'>中</MenuItem>
          <MenuItem value='small'>小</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
}

export default Edit