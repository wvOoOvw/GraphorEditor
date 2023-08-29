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
  const { element, update, component, sx, sendMessage } = props

  const [aceDialog, setAceDialog] = React.useState(false)

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Disable Padding</div>
      <Switch checked={element.property.disablePadding} onChange={e => { element.property.disablePadding = e.target.checked; update() }} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setAceDialog(true)}>Set List</Button>
    </Grid>

    {
      aceDialog ?
        <component.AceDialog
          value={JSON.stringify(value.value, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              onChange((value) => value.value = v_)
              setAceDialog(false)
            } catch {
              alert('Format Error')
            }
          }}
          onClose={() => setAceDialog(false)}
          mode='json'
        />
        : null
    }
  </Grid >
}

export default Edit