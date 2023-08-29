import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Switch } from '@mui/material'
import { Divider } from '@mui/material'
import { Button } from '@mui/material'

function Edit(props) {
  const { element, update, component, sx, sendMessage } = props

  const [aceDialogSX, setAceDialogSX] = React.useState(false)

  return <>
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Value' value={element.property.value} onChange={e => onChange((value) => value.value  = e.target.value; update())} />
      </Grid>
      <Grid item xs={12}>
        <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Href' value={element.property.href} onChange={e => onChange((value) => value.href  = e.target.value; update())} />
      </Grid>
      <Grid item xs={12}>
        <FormControl {...sx.SelectSX} fullWidth>
          <InputLabel>Variant</InputLabel>
          <Select {...sx.SelectSX} value={element.property.variant} label='Variant' onChange={e => { element.property.variant = e.target.value; update() }}>
            <MenuItem value='text'>Text</MenuItem>
            <MenuItem value='outlined'>Outlined</MenuItem>
            <MenuItem value='contained'>Contained</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl {...sx.SelectSX} fullWidth>
          <InputLabel>Color</InputLabel>
          <Select {...sx.SelectSX} value={element.property.color} label='Color' onChange={e => { element.property.color = e.target.value; update() }}>
            <MenuItem value='primary'>Primary</MenuItem>
            <MenuItem value='inherit'>Inherit</MenuItem>
            <MenuItem value='secondary'>Secondary</MenuItem>
            <MenuItem value='success'>Success</MenuItem>
            <MenuItem value='error'>Error</MenuItem>
            <MenuItem value='info'>Info</MenuItem>
            <MenuItem value='warning'>Warning</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>Disabled</div>
        <Switch checked={element.property.disabled} onChange={e => { element.property.disabled = e.target.checked; update() }} />
      </Grid>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>Full Width</div>
        <Switch checked={element.property.fullWidth} onChange={e => { element.property.fullWidth = e.target.checked; update() }} />
      </Grid>

      <Grid item xs={12}><Divider /></Grid>

      <Grid item xs={12}>
        <Button style={{ textTransform: 'none' }} fullWidth variant='outlined' onClick={() => setAceDialogSX(true)}>SX Extra Style</Button>
      </Grid>
      {
        aceDialogSX ?
          <component.AceDialog
            value={JSON.stringify(value.sx, null, 2)}
            onChange={v => {
              console.log(v)
              try {
                onChange((value) => value.sx = JSON.parse(v))
                setAceDialogSX()
              } catch {
                sendMessage('Format Error')
              }
            }}
            onClose={() => setAceDialogSX()}
            mode='json'
          />
          : null
      }
    </Grid>
  </>
}

export default Edit