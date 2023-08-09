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
      <TextField fullWidth label='加载地址' value={value.value} onChange={e => onChange((value) => value.value = e.target.value)} multiline maxRows={4} />
    </Grid>
    <Grid item xs={12}>
      <TextField fullWidth label='id' value={value.id} onChange={e => onChange((value) => value.id = e.target.value)} />
    </Grid>
  </Grid >
}

export default Edit