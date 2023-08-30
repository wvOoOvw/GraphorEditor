import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Switch } from '@mui/material'
import { Button } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { element, property, style, update, component, sx, sendMessage } = props

  const [aceDialogOptions, setAceDialogOptions] = React.useState()

  const changeValue = (e) => {
    if (property.exclusive === true) {
      property.value = e.target.value
    }
    if (property.exclusive === false) {
      property.value = e.target.value.split(',')
    }
    update()
  }

  const changeExclusive = (e) => {
    if (e.target.checked === false) {
      property.exclusive = !e.target.checked
      property.value = property.value.toString()
    }
    if (e.target.checked === true) {
      property.exclusive = !e.target.checked
      property.value = property.value.split(',').filter(i => i)
    }
    update()
  }

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Value' value={property.value} onChange={e => changeValue(e)} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Color</InputLabel>
        <Select {...sx.SelectSX} value={property.color} label='Color' onChange={e => { property.color = e.target.value; update() }}>
          <MenuItem value='standard'>Standard</MenuItem>
          <MenuItem value='primary'>Primary</MenuItem>
          <MenuItem value='secondary'>Secondary</MenuItem>
          <MenuItem value='success'>Success</MenuItem>
          <MenuItem value='error'>Error</MenuItem>
          <MenuItem value='info'>Info</MenuItem>
          <MenuItem value='warning'>Warning</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Size</InputLabel>
        <Select {...sx.SelectSX} value={property.size} label='Size' onChange={e => { property.size = e.target.value; update() }}>
          <MenuItem value='large'>Large</MenuItem>
          <MenuItem value='medium'>Medium</MenuItem>
          <MenuItem value='small'>Small</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Orientation</InputLabel>
        <Select {...sx.SelectSX} value={property.orientation} label='Orientation' onChange={e => { property.orientation = e.target.value; update() }}>
          <MenuItem value='horizontal'>Horizontal</MenuItem>
          <MenuItem value='vertical'>Vertical</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Disabled</div>
      <Switch checked={property.disabled} onChange={e => { property.disabled = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Exclusive</div>
      <Switch checked={!value.exclusive} onChange={e => changeExclusive(e)} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Full Width</div>
      <Switch checked={property.fullWidth} onChange={e => { property.fullWidth = e.target.checked; update() }} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button style={{ textTransform: 'none' }} fullWidth variant='outlined' onClick={() => setAceDialogOptions(true)}>Set Options</Button>
    </Grid>

    {
      aceDialogOptions ?
        <component.AceDialog
          value={JSON.stringify(property.options, null, 2)}
          onChange={v => { try { if (!Array.isArray(JSON.parse(v))) throw new Error(); property.options = JSON.parse(v); update(); setAceDialogOptions(); } catch { sendMessage('Format Error') } }}
          onClose={() => setAceDialogOptions()}
          mode='json'
        />
        : null
    }
  </Grid>
}

export default Edit