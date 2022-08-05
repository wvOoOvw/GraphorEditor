import React from 'react'

import { Grid } from '@mui/material'
import { Button } from '@mui/material'

function Edit(props) {
  const { value, onChange, component } = props

  const [flowModal, setFlowModal] = React.useState()

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setFlowModal(true)}>设置数据</Button>
    </Grid>
    {
      flowModal ?
        <component.CodeModal
          value={value.value}
          onChange={v => {
            onChange((value) => value.value = v)
            setFlowModal(false)
          }}
          onClose={() => setFlowModal(false)}
          mode='html'
          initValue={''}
        /> : null
    }
  </Grid >
}

export default Edit