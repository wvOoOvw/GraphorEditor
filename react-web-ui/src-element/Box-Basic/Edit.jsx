import React from 'react'

import { Grid } from '@mui/material'
import { Button } from '@mui/material'
import { Switch } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  const [aceDialog, setAceDialog] = React.useState()

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Pass Prop</div>
      <Switch checked={value.passProp} onChange={(e) => onChange(Object.assign({}, value, { passProp: e.target.checked }))} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setAceDialog(true)}>Set Value</Button>
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
  </Grid>
}

export default Edit