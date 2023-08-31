import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Button } from '@mui/material'
import { Switch } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { element, property, style, update, component, sx, sendMessage } = props

  const [aceDialogOptions, setAceDialogOptions] = React.useState()

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Centered</div>
      <Switch checked={property.centered} onChange={e => { property.centered = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Value' value={property.value} onChange={e => { property.value = e.target.value; update() }} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Text Color</InputLabel>
        <Select {...sx.SelectSX} value={property.textColor} label='Text Color' onChange={e => { property.textColor = e.target.value; update() }}>
          <MenuItem value='primary'>Primary</MenuItem>
          <MenuItem value='inherit'>Inherit</MenuItem>
          <MenuItem value='secondary'>Secondary</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Indicator Color</InputLabel>
        <Select {...sx.SelectSX} value={property.indicatorColor} label='Indicator Color' onChange={e => { property.indicatorColor = e.target.value; update() }}>
          <MenuItem value='primary'>Primary</MenuItem>
          <MenuItem value='secondary'>Secondary</MenuItem>
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
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Variant</InputLabel>
        <Select {...sx.SelectSX} value={property.variant} label='Variant' onChange={e => { property.variant = e.target.value; update() }}>
          <MenuItem value='standard'>Standard</MenuItem>
          <MenuItem value='fullWidth'>Full Width</MenuItem>
          <MenuItem value='scrollable'>Scrollable</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Scroll Buttons</InputLabel>
        <Select {...sx.SelectSX} value={property.scrollButtons} label='Scroll Buttons' onChange={e => { property.scrollButtons = e.target.value; update() }}>
          <MenuItem value='auto'>Auto</MenuItem>
          <MenuItem value={true}>On</MenuItem>
          <MenuItem value={false}>Off</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button style={{ textTransform: 'none' }} fullWidth variant='outlined' onClick={() => setAceDialogOptions(true)}>Options</Button>
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