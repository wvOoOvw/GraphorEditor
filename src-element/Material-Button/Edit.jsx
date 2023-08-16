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
    <Grid container spacing={1}>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>Disabled</div>
        <Switch checked={value.disabled} onChange={e => onChange(Object.assign({}, value, { disabled: e.target.checked }))} />
      </Grid>
      <Grid item xs={12}>
        <TextField {...sx.TextFieldSX} fullWidth label='Value' value={value.value} onChange={e => onChange((value) => value.value = e.target.value)} />
      </Grid>
      <Grid item xs={12}>
        <FormControl {...sx.SelectSX} fullWidth>
          <InputLabel>Variant</InputLabel>
          <Select {...sx.SelectSX} value={value.variant} label='Variant' onChange={e => onChange(Object.assign({}, value, { variant: e.target.value }))}>
            <MenuItem value='text'>Text</MenuItem>
            <MenuItem value='outlined'>Outlined</MenuItem>
            <MenuItem value='contained'>Contained</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl {...sx.SelectSX} fullWidth>
          <InputLabel>Color</InputLabel>
          <Select {...sx.SelectSX} value={value.color} label='Color' onChange={e => onChange(Object.assign({}, value, { color: e.target.value }))}>
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