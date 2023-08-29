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
  const { element, property, style, update, component, sx, sendMessage } = props

  const [modalHead, setModalHead] = React.useState(false)
  const [modalBody, setModalBody] = React.useState(false)

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>图例</div>
      <Switch checked={property.option.legend.show} onChange={e => { property.option.legend.show = e.target.checked; updare() }} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>网格</div>
      <Switch checked={property.option.grid.show} onChange={e => { property.option.grid.show = e.target.checked; updare() }} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>X轴</div>
      <Switch checked={property.option.xAxis.show} onChange={e => { property.option.xAxis.show = e.target.checked; updare() }} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Y轴</div>
      <Switch checked={property.option.yAxis.show} onChange={e => { property.option.yAxis.show = e.target.checked; updare() }} />
    </Grid>


    {
      modalHead ?
        <component.AceDialog
          value={JSON.stringify(value.head, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              property.head = v_
              updare()
              setModalHead(false)
            } catch {
              alert('Format Error')
            }
          }}
          onClose={() => setModalHead(false)}
          mode='json'
        />
        : null
    }

    {
      modalBody ?
        <component.AceDialog
          value={JSON.stringify(value.body, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              property.body = v_
              updare()
              setModalBody(false)
            } catch {
              alert('Format Error')
            }
          }}
          onClose={() => setModalBody(false)}
          mode='json'
        />
        : null
    }
  </Grid >
}

export default Edit