import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Button } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { element, property, style, update, component, sx, sendMessage } = props

  const [aceDialogOptions, setAceDialogOptions] = React.useState()

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Value' value={property.value} onChange={e => { property.value = e.target.value; update() }} />
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