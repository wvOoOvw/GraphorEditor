import React from 'react'

import { Grid } from '@mui/material'
import { Button } from '@mui/material'

function Edit(props) {
  const { element, update, component, sx, sendMessage } = props

  const [aceDialog, setAceDialog] = React.useState()

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setAceDialog(true)}>Value</Button>
    </Grid>
    {
      aceDialog ?
        <component.AceDialog
          value={value.value}
          onChange={v => {
            onChange((value) => value.value = v)
            setAceDialog(false)
          }}
          onClose={() => setAceDialog(false)}
          mode='html'
        />
        : null
    }
  </Grid >
}

export default Edit