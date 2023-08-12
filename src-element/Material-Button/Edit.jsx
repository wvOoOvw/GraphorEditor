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

  return <>
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>禁用</div>
        <Switch checked={value.disabled} onChange={e => onChange(Object.assign({}, value, { disabled: e.target.checked }))} />
      </Grid>
      <Grid item xs={12}>
        <TextField {...sx.TextFieldSX} fullWidth label='内容' value={value.value} onChange={e => onChange((value) => value.value = e.target.value)} multiline maxRows={4} />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>类型</InputLabel>
          <Select value={value.variant} label='类型' onChange={e => onChange(Object.assign({}, value, { variant: e.target.value }))}>
            <MenuItem value='text'>文字</MenuItem>
            <MenuItem value='outlined'>边线</MenuItem>
            <MenuItem value='contained'>填充</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>主题颜色</InputLabel>
          <Select value={value.color} label='主题颜色' onChange={e => onChange(Object.assign({}, value, { color: e.target.value }))}>
            {
              ['primary', 'inherit', 'secondary', 'success', 'error', 'info', 'warning'].map(i => {
                return <MenuItem key={i} value={i}>{i}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </Grid>
    </Grid >
  </>
}

export default Edit