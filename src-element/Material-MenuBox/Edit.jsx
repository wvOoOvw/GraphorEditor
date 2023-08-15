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
  const { value, onChange, component, sx } = props

  const [modalOptions, setModalOptions] = React.useState(false)

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>默认打开</div>
      <Switch checked={value.open} onChange={e => onChange(Object.assign({}, value, { open: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>点击关闭</div>
      <Switch checked={value.clickClose} onChange={e => onChange(Object.assign({}, value, { clickClose: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>唤起方式</InputLabel>
        <Select {...sx.SelectSX} value={value.openType} label='唤起方式' onChange={e => onChange(Object.assign({}, value, { openType: e.target.value }))}>
          <MenuItem value='click'>点击</MenuItem>
          <MenuItem value='mouseover'>悬浮</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setModalOptions(true)}>配置选项数据</Button>
    </Grid>

    {
      modalOptions ?
        <component.AceDialog
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