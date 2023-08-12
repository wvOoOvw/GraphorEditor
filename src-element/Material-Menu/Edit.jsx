import React from 'react'

import { Grid } from '@mui/material'
import { Button } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  const [modalOptions, setModalOptions] = React.useState(false)

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setModalOptions(true)}>配置选项数据</Button>
    </Grid>

    {
      modalOptions ?
        <component.CodeModal
          value={JSON.stringify(value.options, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              onChange((value) => value.options = v_)
              setModalOptions(false)
            } catch {
              alert('格式错误')
            }
          }}
          onClose={() => setModalOptions(false)}
          mode='json'
          initValue={'[]'}
        /> : null
    }
  </Grid>
}

export default Edit