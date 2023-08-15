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

  const [modalValue, setModalValue] = React.useState(false)

  return <Grid container spacing={1}>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>清除间距</div>
      <Switch checked={value.disablePadding} onChange={e => onChange(Object.assign({}, value, { disablePadding: e.target.checked }))} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>水平对齐方式</InputLabel>
        <Select {...sx.SelectSX} value={value.textAlign} label='对齐方式' onChange={e => onChange(Object.assign({}, value, { textAlign: e.target.value }))}  >
          <MenuItem value='center'>居中</MenuItem>
          <MenuItem value='left'>左</MenuItem>
          <MenuItem value='right'>右</MenuItem>
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button fullWidth variant='outlined' onClick={() => setModalValue(true)}>配置列表数据</Button>
    </Grid>

    {
      modalValue ?
        <component.AceDialog
          value={JSON.stringify(value.value, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              onChange((value) => value.value = v_)
              setModalValue(false)
            } catch {
              alert('格式错误')
            }
          }}
          onClose={() => setModalValue(false)}
          mode='json'
          initValue={'[]'}
        /> : null
    }
  </Grid >
}

export default Edit