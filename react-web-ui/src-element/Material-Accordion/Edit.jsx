import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Switch } from '@mui/material'
import { Button } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { element, update, component, sx, sendMessage } = props

  const [aceDialogSX, setAceDialogSX] = React.useState(false)

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Title' value={element.property.title} onChange={e => { element.property.title = e.target.value; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Title Custom</div>
      <Switch checked={element.property.titleCustom} onChange={e => { element.property.titleCustom = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Disabled</div>
      <Switch checked={element.property.disabled} onChange={e => { element.property.disabled = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Expanded</div>
      <Switch checked={element.property.expanded} onChange={e => { element.property.expanded = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>ExpandIcon</div>
      <Switch checked={element.property.expandIcon} onChange={e => { element.property.expandIcon = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Divider</div>
      <Switch checked={element.property.divider} onChange={e => { element.property.divider = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Disable Gutters</div>
      <Switch checked={element.property.disableGutters} onChange={e => { element.property.disableGutters = e.target.checked; update() }} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Square</div>
      <Switch checked={element.property.square} onChange={e => { element.property.square = e.target.checked; update() }} />
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
            try {
              element.property.sx = JSON.parse(v)
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