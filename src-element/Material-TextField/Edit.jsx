import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Switch } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  const [aceDialogSX, setAceDialogSX] = React.useState(false)

  const handleSetType = e => {
    if (e.type === 'file') onChange((value) => value.value = '')
    onChange((value) => value.type = e.target.value)
  }

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth label='Label' value={value.label} onChange={e => onChange(Object.assign({}, value, { label: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth label='Placeholder' value={value.placeholder} onChange={e => onChange(Object.assign({}, value, { placeholder: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth label='Value' value={value.value} onChange={e => onChange(Object.assign({}, value, { value: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>类型</InputLabel>
        <Select {...sx.SelectSX} value={value.type} label='类型' onChange={handleSetType}>
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
        <Select {...sx.SelectSX} value={value.variant} label='样式类型' onChange={e => onChange(Object.assign({}, value, { variant: e.target.value }))}>
          <MenuItem value='outlined'>边线</MenuItem>
          <MenuItem value='filled'>填充</MenuItem>
          <MenuItem value='standard'>默认</MenuItem>
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
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Size</InputLabel>
        <Select {...sx.SelectSX} value={value.size} label='Size' onChange={e => onChange(Object.assign({}, value, { size: e.target.value }))}>
          <MenuItem value='medium'>Medium</MenuItem>
          <MenuItem value='small'>Small</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Disabled</div>
      <Switch checked={value.disabled} onChange={e => onChange(Object.assign({}, value, { disabled: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Full Width</div>
      <Switch checked={value.fullWidth} onChange={e => onChange(Object.assign({}, value, { fullWidth: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Multiline</div>
      <Switch checked={value.multiline} onChange={e => onChange(Object.assign({}, value, { multiline: e.target.checked }))} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button style={{ textTransform: 'none' }} fullWidth variant='outlined' onClick={() => setAceDialogSX(true)}>SX Extra Style</Button>
    </Grid>
    {
      aceDialogSX ?
        <component.AceDialog
          value={JSON.stringify(value.sx, null, 2)}
          onChange={v => {
            console.log(v)
            try {
              onChange((value) => value.sx = JSON.parse(v))
              setAceDialogSX()
            } catch {
              sendMessage('Format Error')
            }
          }}
          onClose={() => setAceDialogSX()}
          mode='json'
        />
        : null
    }
  </Grid>
}

export default Edit