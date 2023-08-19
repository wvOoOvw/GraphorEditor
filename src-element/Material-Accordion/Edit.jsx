import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Switch } from '@mui/material'
import { Button } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx, sendMessage } = props

  const [aceDialogSX, setAceDialogSX] = React.useState(false)

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth label='Title' value={value.title} onChange={e => onChange(Object.assign({}, value, { title: e.target.value }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Disabled</div>
      <Switch checked={value.disabled} onChange={e => onChange(Object.assign({}, value, { disabled: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Expanded</div>
      <Switch checked={value.expanded} onChange={e => onChange(Object.assign({}, value, { expanded: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>ExpandIcon</div>
      <Switch checked={value.expandIcon} onChange={e => onChange(Object.assign({}, value, { expandIcon: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Divider</div>
      <Switch checked={value.divider} onChange={e => onChange(Object.assign({}, value, { divider: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Disable Gutters</div>
      <Switch checked={value.disableGutters} onChange={e => onChange(Object.assign({}, value, { disableGutters: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Square</div>
      <Switch checked={value.square} onChange={e => onChange(Object.assign({}, value, { square: e.target.checked }))} />
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