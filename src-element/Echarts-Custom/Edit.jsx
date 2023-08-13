import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'
import { Switch } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogActions } from '@mui/material'
import { DialogContent } from '@mui/material'
import { Button } from '@mui/material'
import { Divider } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  const [modalHead, setModalHead] = React.useState(false)
  const [modalBody, setModalBody] = React.useState(false)

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>图例</div>
      <Switch checked={value.option.legend.show} onChange={e => onChange(v => v.option.legend.show = e.target.checked)} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>网格</div>
      <Switch checked={value.option.grid.show} onChange={e => onChange(v => v.option.grid.show = e.target.checked)} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>X轴</div>
      <Switch checked={value.option.xAxis.show} onChange={e => onChange(v => v.option.xAxis.show = e.target.checked)} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Y轴</div>
      <Switch checked={value.option.yAxis.show} onChange={e => onChange(v => v.option.yAxis.show = e.target.checked)} />
    </Grid>


    {
      modalHead ?
        <component.CodeModal
          value={JSON.stringify(value.head, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              onChange((value) => value.head = v_)
              setModalHead(false)
            } catch {
              alert('格式错误')
            }
          }}
          onClose={() => setModalHead(false)}
          mode='json'
          initValue={'[]'}
        /> : null
    }

    {
      modalBody ?
        <component.CodeModal
          value={JSON.stringify(value.body, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              onChange((value) => value.body = v_)
              setModalBody(false)
            } catch {
              alert('格式错误')
            }
          }}
          onClose={() => setModalBody(false)}
          mode='json'
          initValue={'[]'}
        /> : null
    }
  </Grid >
}

export default Edit