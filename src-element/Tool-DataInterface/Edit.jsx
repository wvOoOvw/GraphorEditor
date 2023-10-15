import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { Switch } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'

function Edit(props) {
  const { element, property, style, update, component, sx, sendMessage } = props

  const transformTypeChange = e => {
    property.transformType = e.target.value
    property.transformValue = []
    update()
  }

  return <Grid container spacing={1}>
    <Grid item xs={12}>
      <FormControl {...sx.SelectSX} fullWidth>
        <InputLabel>Transform Type</InputLabel>
        <Select {...sx.SelectSX} value={property.transformType} label='Transform Type' onChange={transformTypeChange}>
          <MenuItem value='key2object'>Key To Object</MenuItem>
          <MenuItem value='object2key'>Object To Key</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    {
      property.transformType === 'key2object' || property.transformType === 'object2key' ?
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextField {...sx.TextFieldSX} fullWidth autoComplete='off' label='Transform Value' TransformValue={property.transformValue[0]} onChange={e => { property.transformValue[0] = e.target.value; update() }} />
        </Grid>
        : null
    }
  </Grid>
}

export default Edit