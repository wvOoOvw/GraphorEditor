import React from 'react'

import { Grid } from '@mui/material'
import { Switch } from '@mui/material'
import { TextField } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth label='Router Value' value={value.value} onChange={e => onChange((value) => value.value = e.target.value)} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Router Type</InputLabel>
        <Select {...sx.SelectSX} value={value.type} label='Router Type' onChange={e => onChange(Object.assign({}, value, { type: e.target.value }))}>
          <MenuItem value='equal'>Equal</MenuItem>
          <MenuItem value='start'>Start</MenuItem>
          <MenuItem value='includes'>Inclueds</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid >
}

export default Edit