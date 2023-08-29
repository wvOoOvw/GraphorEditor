import React from 'react'

import { Grid } from '@mui/material'
import { Button } from '@mui/material'

function Edit(props) {
  const { element, property, style, update, component, sx, sendMessage } = props

  const [aceDialogValue, setAceDialogValue] = React.useState()

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setAceDialogValue(true)}>Set Value</Button>
    </Grid>
    
    {
      aceDialogValue ?
        <component.AceDialog
          value={JSON.stringify(value.value, null, 2)}
          onChange={v => { try { if (!Array.isArray(JSON.parse(v))) throw new Error(); property.value = JSON.parse(v); update(); setAceDialogValue(); } catch { sendMessage('Format Error') } }}
          onClose={() => setAceDialogValue()}
          mode='json'
        />
        : null
    }
  </Grid>
}

export default Edit