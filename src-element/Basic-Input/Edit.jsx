import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Switch } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  const handleSetType = e => {
    if (e.target.value === 'file') onChange((value) => value.value = '')
    onChange((value) => value.type = e.target.value)
  }

  return <Grid container spacing={2}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>禁用</div>
      <Switch checked={value.disabled} onChange={e => onChange(Object.assign({}, value, { disabled: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField fullWidth label='内容' value={value.value} onChange={e => onChange((value) => value.value = e.target.value)} multiline maxRows={4} />
    </Grid>
    <Grid item xs={12}>
      <TextField fullWidth label='提示' value={value.placeholder} onChange={e => onChange((value) => value.placeholder = e.target.value)} />
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>类型</InputLabel>
        <Select value={value.type} label='类型' onChange={handleSetType}>
          <MenuItem value='text'>文本</MenuItem>
          <MenuItem value='textarea'>文本域</MenuItem>
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

    {
      value.type === 'file' ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>多选</span>
            <Switch checked={value.fileMultiple} onChange={e => onChange(Object.assign({}, value, { fileMultiple: e.target.checked }))} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label='上传限制' value={value.fileAccept} onChange={e => onChange(Object.assign({}, value, { fileAccept: e.target.value }))} />
          </Grid>
        </> : null
    }
  </Grid>
}

export default Edit