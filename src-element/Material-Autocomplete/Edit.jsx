import React from 'react'

import { TextField } from '@mui/material'
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

  const [aceDialog, setAceDialog] = React.useState()

  const changeValue = (e) => {
    if (value.multiple) {
      onChange(Object.assign({}, value, { value: e.target.value.split(',') }))
    } else {
      onChange(Object.assign({}, value, { value: e.target.value }))
    }
  }
  const changemultiple = (e) => {
    if (e.target.checked) {
      onChange(Object.assign({}, value, { multiple: e.target.checked, value: value.value.split(',').filter(i => i) }))
    } else {
      onChange(Object.assign({}, value, { multiple: e.target.checked, value: value.value.toString() }))
    }
  }

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth label='Label' value={value.label} onChange={e => onChange(Object.assign({}, value, { label: e.target.value }))} />
    </Grid>
    <Grid item xs={12}>
      <TextField {...sx.TextFieldSX} fullWidth label='Value' value={value.value} onChange={e => changeValue(e)} />
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Variant</InputLabel>
        <Select {...sx.SelectSX} value={value.variant} label='Variant' onChange={e => onChange(Object.assign({}, value, { variant: e.target.value }))}>
          <MenuItem value='outlined'>Outlined</MenuItem>
          <MenuItem value='filled'>Filled</MenuItem>
          <MenuItem value='standard'>Standard</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Size</InputLabel>
        <Select {...sx.SelectSX} value={value.size} label='Size' onChange={e => onChange(Object.assign({}, value, { size: e.target.value }))}>
          <MenuItem value='medium'>Medium</MenuItem>
          <MenuItem value='small'>Small</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Disabled</div>
      <Switch checked={value.disabled} onChange={e => onChange(Object.assign({}, value, { disabled: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Full Width</div>
      <Switch checked={value.fullWidth} onChange={e => onChange(Object.assign({}, value, { fullWidth: e.target.checked }))} />
    </Grid>
    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Multiple</div>
      <Switch checked={value.multiple} onChange={e => changemultiple(e)} />
    </Grid>

    <Grid item xs={12}><Divider /></Grid>

    <Grid item xs={12}>
      <Button style={{ textTransform: 'none' }} fullWidth variant='outlined' onClick={() => setAceDialog(true)}>Set Options</Button>
    </Grid>
    {
      aceDialog ?
        <component.AceDialog
          value={JSON.stringify(value.options, null, 2)}
          onChange={v => {
            try {
              const v_ = JSON.parse(v)
              if (!Array.isArray(v_)) throw new Error()
              onChange((value) => value.options = v_)
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