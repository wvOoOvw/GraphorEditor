import React from 'react'

import { TextField } from '@mui/material'
import { Switch } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'

function Edit(props) {
  const { element, update, component, sx, sendMessage } = props

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Use Dom Link</div>
      <Switch checked={element.property.useDom} onChange={(e) => { useDom = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Href' value={element.property.href} onChange={e => { element.property.href = e.target.value; update() }} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Target</InputLabel>
        <Select {...sx.SelectSX} value={element.property.target} label='Target' onChange={e => { element.property.target = e.target.value; update() }}  >
          <MenuItem value='_self'>当前页面打开</MenuItem>
          <MenuItem value='_blank'>新窗口打开</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
}

export default Edit