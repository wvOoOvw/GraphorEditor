import React from 'react'

import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Switch } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>禁用</div>
      <Switch checked={value.disabled} onChange={e => onChange(Object.assign({}, value, { disabled: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>默认值</div>
      <Switch checked={value.checked} onChange={e => onChange(Object.assign({}, value, { checked: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>主题颜色</InputLabel>
        <Select {...sx.SelectSX} value={value.color} label='主题颜色' onChange={e => onChange(Object.assign({}, value, { color: e.target.value }))}>
          {
            ['primary', 'secondary', 'success', 'error', 'info', 'warning'].map(i => {
              return <MenuItem key={i} value={i}>{i}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>尺寸</InputLabel>
        <Select {...sx.SelectSX} value={value.size} label='尺寸' onChange={e => onChange(Object.assign({}, value, { size: e.target.value }))}>
          <MenuItem value='large'>大</MenuItem>
          <MenuItem value='medium'>中</MenuItem>
          <MenuItem value='small'>小</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
}

export default Edit