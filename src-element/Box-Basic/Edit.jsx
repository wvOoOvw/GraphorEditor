import React from 'react'

import { Grid } from '@mui/material'
import { Button } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  const [flowModal, setFlowModal] = React.useState()

  const getValue = (v) => {
    try {
      return JSON.stringify(v, null, 2)
    } catch {
      return v
    }
  }

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setFlowModal(true)}>设置数据</Button>
    </Grid>
    {
      flowModal ?
        <component.CodeModal
          value={getValue(value.value)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              onChange((value) => value.value = v_)
              setFlowModal(false)
            } catch {
              alert('格式错误')
            }
          }}
          onClose={() => setFlowModal(false)}
          mode='json'
          initValue={'null'}
        /> : null
    }
  </Grid >
}

export default Edit