import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Switch } from '@mui/material'
import { Button } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { element, update, component, sx, sendMessage } = props

  const [aceDialog, setAceDialog] = React.useState()

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Immediate Effect</div>
      <Switch checked={element.property.immediate} onChange={e => onChange((value) => value.immediate = e.target.checked)} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button style={{ textTransform: 'none' }} fullWidth variant='outlined' onClick={() => setAceDialog(true)}>Set Value</Button>
    </Grid>
    {
      aceDialog ?
        <component.AceDialog
          value={JSON.stringify(value.value, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              onChange((value) => value.value = v_)
              setAceDialog(false)
            } catch {
              alert('Format Error')
            }
          }}
          onClose={() => setAceDialog(false)}
          mode='json'
          initValue={'{}'}
        />
        : null
    }

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>Use Window Property</div>
        <Switch checked={element.property.useWindow} onChange={e => onChange((value) => value.useWindow = e.target.checked)} />
      </Grid>
    </Grid>
    {
      value.useWindow ?
        <>
          <Grid item xs={12}>
            <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Window Property Name' value={element.property.windowName} onChange={e => onChange((value) => value.windowName  = e.target.value; update())} />
          </Grid>
        </>
        : null
    }
  </Grid>
}

export default Edit