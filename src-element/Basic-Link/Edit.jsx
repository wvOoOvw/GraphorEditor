import React from 'react'

import { TextField } from '@mui/material'
import { Switch } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Use Dom Link</div>
      <Switch checked={value.useDom} onChange={(e) => onChange(Object.assign({}, value, { useDom: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Href' value={value.href} onChange={e => onChange(Object.assign({}, value, { href: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Target</InputLabel>
        <Select {...sx.SelectSX} value={value.target} label='Target' onChange={e => onChange(Object.assign({}, value, { target: e.target.value }))}  >
          <MenuItem value='_self'>当前页面打开</MenuItem>
          <MenuItem value='_blank'>新窗口打开</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
}

export default Edit