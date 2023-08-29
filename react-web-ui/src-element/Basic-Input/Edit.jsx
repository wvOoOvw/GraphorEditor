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
  const { element, update, component, sx, sendMessage } = props

  const handleSetType = e => {
    if (e.target.value === 'file') onChange((value) => value.value = '')
    onChange((value) => value.type  = e.target.value; update())
  }

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Disabled</div>
      <Switch checked={element.property.disabled} onChange={e => { element.property.disabled = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Value' value={element.property.value} onChange={e => onChange((value) => value.value  = e.target.value; update())} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Placeholder' value={element.property.placeholder} onChange={e => onChange((value) => value.placeholder  = e.target.value; update())} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Type</InputLabel>
        <Select {...sx.SelectSX} value={element.property.type} label='Type' onChange={handleSetType}>
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
          <Grid item xs={12}><Divider /></Grid>

          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='File Accept' value={element.property.fileAccept} onChange={e => { element.property.fileAccept = e.target.value; update() }} />
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>File Multiple</span>
            <Switch checked={element.property.fileMultiple} onChange={e => { element.property.fileMultiple = e.target.checked; update() }} />
          </Grid>
        </>
        : null
    }
  </Grid>
}

export default Edit