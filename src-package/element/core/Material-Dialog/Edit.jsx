import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Switch } from '@mui/material'

function Edit(props) {
  const { value, onChange } = props

  return <Grid container spacing={2}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>打开</div>
      <Switch checked={value.open} onChange={e => onChange(v => v.open = e.target.checked)} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>分割线</div>
      <Switch checked={value.dividers} onChange={e => onChange(v => v.dividers = e.target.checked)} />
    </Grid>
  </Grid>
}

export default Edit