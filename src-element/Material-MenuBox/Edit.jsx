import React from 'react'

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

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Open</div>
      <Switch checked={value.open} onChange={e => onChange(Object.assign({}, value, { open: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Open Type</InputLabel>
        <Select {...sx.SelectSX} value={value.openType} label='Open Type' onChange={e => onChange(Object.assign({}, value, { openType: e.target.value }))}>
          <MenuItem value='click'>Click</MenuItem>
          <MenuItem value='mouseover'>Mouseover</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
}

export default Edit