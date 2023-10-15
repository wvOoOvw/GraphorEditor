import React from 'react'

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

  const [aceDialogValue, setAceDialogValue] = React.useState(false)

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Disable Padding</div>
      <Switch checked={property.disablePadding} onChange={e => { property.disablePadding = e.target.checked; update() }} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setAceDialogValue(true)}>Value</Button>
    </Grid>

    {
      aceDialogValue ?
        <component.AceDialog
          value={JSON.stringify(property.value, null, 2)}
          onChange={v => { try { if (!Array.isArray(JSON.parse(v))) throw new Error(); property.value = JSON.parse(v); update(); setAceDialogOptions(); } catch { sendMessage('Format Error') } }}
          onClose={() => setAceDialogOptions()}
          mode='json'
        />
        : null
    }
  </Grid >
}

export default Edit