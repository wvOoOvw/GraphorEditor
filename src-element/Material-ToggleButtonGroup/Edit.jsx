import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Switch } from '@mui/material'
import { Button } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  const [modalOptions, setModalOptions] = React.useState(false)

  const changeValue = (e) => {
    if (value.exclusive) {
      onChange(Object.assign({}, value, { value: e.target.value }))
    } else {
      onChange(Object.assign({}, value, { value: e.target.value.split(',') }))
    }
  }
  const changeExclusive = (e) => {
    if (!e.target.checked) {
      onChange(Object.assign({}, value, { exclusive: !e.target.checked, value: value.value.toString() }))
    } else {
      onChange(Object.assign({}, value, { exclusive: !e.target.checked, value: value.value.split(',').filter(i => i) }))
    }
  }

  return <Grid container spacing={2}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>禁用</div>
      <Switch checked={value.disabled} onChange={e => onChange(Object.assign({}, value, { disabled: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>多选</div>
      <Switch checked={!value.exclusive} onChange={e => changeExclusive(e)} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>填充宽度</div>
      <Switch checked={value.fullWidth} onChange={e => onChange(Object.assign({}, value, { fullWidth: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth label='默认值' value={value.value} onChange={e => changeValue(e)} />
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>主题颜色</InputLabel>
        <Select value={value.color} label='主题颜色' onChange={e => onChange(Object.assign({}, value, { color: e.target.value }))}>
          {
            ['standard', 'primary', 'secondary', 'success', 'error', 'info', 'warning'].map(i => {
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
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>排列方向</InputLabel>
        <Select value={value.orientation} label='排列方向' onChange={e => onChange(Object.assign({}, value, { orientation: e.target.value }))}>
          <MenuItem value='horizontal'>横向</MenuItem>
          <MenuItem value='vertical'>纵向</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setModalOptions(true)}>配置选项数据</Button>
    </Grid>

    {
      modalOptions ?
        <component.CodeModal
          value={JSON.stringify(value.options, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              onChange((value) => value.options = v_)
              setModalOptions(false)
            } catch {
              alert('格式错误')
            }
          }}
          onClose={() => setModalOptions(false)}
          mode='json'
          initValue={'[]'}
        /> : null
    }
  </Grid>
}

export default Edit