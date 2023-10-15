import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Switch } from '@mui/material'
import { Divider } from '@mui/material'
import { Button } from '@mui/material'

function Edit(props) {
  const { element, property, style, update, component, sx, sendMessage } = props


  const handleSetType = e => {
    if (e.type === 'file') {
      property.value = ''
    }
    property.type = e.target.value
    update()
  }

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Label' value={property.label} onChange={e => { property.label = e.target.value; update() }} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Placeholder' value={property.placeholder} onChange={e => { property.placeholder = e.target.value; update() }} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Value' value={property.value} onChange={e => { property.value = e.target.value; update() }} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>类型</InputLabel>
        <Select {...sx.SelectSX} value={property.type} label='类型' onChange={handleSetType}>
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
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>样式类型</InputLabel>
        <Select {...sx.SelectSX} value={property.variant} label='样式类型' onChange={e => { property.variant = e.target.value; update() }}>
          <MenuItem value='outlined'>边线</MenuItem>
          <MenuItem value='filled'>填充</MenuItem>
          <MenuItem value='standard'>默认</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Color</InputLabel>
        <Select {...sx.SelectSX} value={property.color} label='Color' onChange={e => { property.color = e.target.value; update() }}>
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
        <Select {...sx.SelectSX} value={property.size} label='Size' onChange={e => { property.size = e.target.value; update() }}>
          <MenuItem value='medium'>Medium</MenuItem>
          <MenuItem value='small'>Small</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Disabled</div>
      <Switch checked={property.disabled} onChange={e => { property.disabled = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Full Width</div>
      <Switch checked={property.fullWidth} onChange={e => { property.fullWidth = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Multiline</div>
      <Switch checked={property.multiline} onChange={e => { property.multiline = e.target.checked; update() }} />
    </Grid>
  </Grid>
}

export default Edit