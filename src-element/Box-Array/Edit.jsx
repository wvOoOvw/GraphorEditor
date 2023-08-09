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
          value={JSON.stringify(value.value, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              onChange((value) => value.value = v_)
              setFlowModal(false)
            } catch {
              alert('格式错误')
            }
          }}
          onClose={() => setFlowModal(false)}
          mode='json'
          initValue={'[]'}
        /> : null
    }
  </Grid>
}

export default Edit