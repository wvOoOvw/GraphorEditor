import React from 'react'

import { Grid } from '@mui/material'
import { Switch } from '@mui/material'
import { TextField } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'

function Edit(props) {
  const { value, onChange } = props

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField fullWidth label='识别路由' value={value.value} onChange={e => onChange((value) => value.value = e.target.value)} multiline maxRows={4} />
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>路由识别方式</InputLabel>
        <Select value={value.type} label='路由识别方式' onChange={e => onChange(Object.assign({}, value, { type: e.target.value }))}>
          <MenuItem value='none'>不识别</MenuItem>
          <MenuItem value='equal'>完全相等</MenuItem>
          <MenuItem value='start'>起始相等</MenuItem>
          <MenuItem value='includes'>包含</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid >
}

export default Edit