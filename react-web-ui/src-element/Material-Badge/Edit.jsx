import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Divider } from '@mui/material'
import { Button } from '@mui/material'

function Edit(props) {
  const { element, update, component, sx, sendMessage } = props

  const [aceDialogSX, setAceDialogSX] = React.useState(false)

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Badge Content' value={element.property.badgeContent} onChange={e => { element.property.badgeContent = e.target.value; update() }} type='number' />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Max' value={element.property.max} onChange={e => { element.property.max = e.target.value; update() }} type='number' />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Variant</InputLabel>
        <Select {...sx.SelectSX} value={element.property.variant} label='Variant' onChange={e => { element.property.variant = e.target.value; update() }}>
          <MenuItem value='standard'>Standard</MenuItem>
          <MenuItem value='dot'>Dot</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Color</InputLabel>
        <Select {...sx.SelectSX} value={element.property.color} label='Color' onChange={e => { element.property.color = e.target.value; update() }}>
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
        <InputLabel>Overlap</InputLabel>
        <Select {...sx.SelectSX} value={element.property.overlap} label='Overlap' onChange={e => { element.property.overlap = e.target.value; update() }}>
          <MenuItem value='rectangular'>Vectangular</MenuItem>
          <MenuItem value='circular'>Circular</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Horizontal Position</InputLabel>
        <Select {...sx.SelectSX} value={element.property.anchorOrigin.horizontal} label='Horizontal Position' onChange={e => onChange((v) => v.anchorOrigin.horizontal  = e.target.value; update())}>
          <MenuItem value='left'>Left</MenuItem>
          <MenuItem value='right'>Right</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Vertical Position</InputLabel>
        <Select {...sx.SelectSX} value={element.property.anchorOrigin.vertical} label='Vertical Position' onChange={e => onChange((v) => v.anchorOrigin.vertical  = e.target.value; update())}>
          <MenuItem value='top'>Top</MenuItem>
          <MenuItem value='bottom'>Bottom</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Invisible</div>
      <Switch checked={element.property.invisible} onChange={e => { element.property.invisible = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Show Zero</div>
      <Switch checked={element.property.showZero} onChange={e => { element.property.showZero = e.target.checked; update() }} />
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
}

export default Edit