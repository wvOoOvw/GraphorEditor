import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Switch } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  const handleSetType = e => {
    if (e.target.value === 'file') onChange((value) => value.value = '')
    onChange((value) => value.type = e.target.value)
  }

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Disabled</div>
      <Switch checked={value.disabled} onChange={e => onChange(Object.assign({}, value, { disabled: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth label='Value' value={value.value} onChange={e => onChange((value) => value.value = e.target.value)} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth label='Placeholder' value={value.placeholder} onChange={e => onChange((value) => value.placeholder = e.target.value)} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Type</InputLabel>
        <Select {...sx.SelectSX} value={value.type} label='Type' onChange={handleSetType}>
          <MenuItem value='text'>Text</MenuItem>
          <MenuItem value='textarea'>Textarea</MenuItem>
          <MenuItem value='password'>Password</MenuItem>
          <MenuItem value='number'>Number</MenuItem>
          <MenuItem value='file'>File</MenuItem>
          <MenuItem value='url'>Url</MenuItem>
          <MenuItem value='email'>Email</MenuItem>
          <MenuItem value='time'>Time</MenuItem>
          <MenuItem value='date'>Date</MenuItem>
          <MenuItem value='datetime'>Datetime</MenuItem>
          <MenuItem value='datetime-local'>Datetime-local</MenuItem>
          <MenuItem value='week'>Week</MenuItem>
          <MenuItem value='month'>Month</MenuItem>
          <MenuItem value='color'>Color</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    {
      value.type === 'file' ?
        <>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>File Multiple</span>
            <Switch checked={value.fileMultiple} onChange={e => onChange(Object.assign({}, value, { fileMultiple: e.target.checked }))} />
          </Grid>
          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth label='File Accept' value={value.fileAccept} onChange={e => onChange(Object.assign({}, value, { fileAccept: e.target.value }))} />
          </Grid>
        </> : null
    }
  </Grid>
}

export default Edit