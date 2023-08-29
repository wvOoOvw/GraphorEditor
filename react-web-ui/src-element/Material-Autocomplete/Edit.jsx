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
    if (property.multiple === true) {
      property.value = e.target.value.split(',')
    }
    if (property.multiple === false) {
      property.value = e.target.value
    }
    update()
  }

  const changeOptions = (e) => {
    property.value = e.target.value.split(',')
    update()
  }

  const changemultiple = (e) => {
    if (e.target.checked === true) {
      property.multiple = e.target.checked
      property.value = property.value.split(',').filter(i => i)
    }
    if (e.target.checked === false) {
      property.multiple = e.target.checked
      property.value = property.value.toString()
    }
    update()
  }

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Label' value={property.label} onChange={e => { property.label = e.target.value; update() }} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Value' value={property.value} onChange={e => changeValue(e)} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Options' value={property.options} onChange={e => changeOptions(e)} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Variant</InputLabel>
        <Select {...sx.SelectSX} value={property.variant} label='Variant' onChange={e => { property.variant = e.target.value; update() }}>
          <MenuItem value='outlined'>Outlined</MenuItem>
          <MenuItem value='filled'>Filled</MenuItem>
          <MenuItem value='standard'>Standard</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Size</InputLabel>
        <Select {...sx.SelectSX} value={property.size} label='Size' onChange={e => { property.size = e.target.value; update() }}>
          <MenuItem value='medium'>Medium</MenuItem>
          <MenuItem value='small'>Small</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Disabled</div>
      <Switch checked={property.disabled} onChange={e => { property.disabled = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Full Width</div>
      <Switch checked={property.fullWidth} onChange={e => { property.fullWidth = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Multiple</div>
      <Switch checked={property.multiple} onChange={e => changemultiple(e)} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button style={{ textTransform: 'none' }} fullWidth variant='outlined' onClick={() => setAceDialogOptions(true)}>Set Options</Button>
    </Grid>

    {
      aceDialogOptions ?
        <component.AceDialog
          value={JSON.stringify(value.options, null, 2)}
          onChange={v => { try { if (!Array.isArray(JSON.parse(v))) throw new Error(); property.options = JSON.parse(v); update(); setAceDialogOptions(); } catch { sendMessage('Format Error') } }}
          onClose={() => setAceDialogOptions()}
          mode='json'
        />
        : null
    }
  </Grid>
}

export default Edit