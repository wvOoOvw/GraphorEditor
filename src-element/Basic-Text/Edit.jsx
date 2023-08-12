import React from 'react'

import { TextField } from '@mui/material'
import { Grid } from '@mui/material'
import { InputLabel } from '@mui/material'
import { MenuItem } from '@mui/material'
import { FormControl } from '@mui/material'
import { Select } from '@mui/material'

function Edit(props) {
  const { value, onChange, component, sx } = props

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField fullWidth label='内容' value={value.value} onChange={e => onChange(Object.assign({}, value, { value: e.target.value }))} multiline maxRows={4} />
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel>渲染标签</InputLabel>
        <Select value={value.dom} label='渲染标签' onChange={e => onChange(Object.assign({}, value, { dom: e.target.value }))}>
          <MenuItem value='div'>Div</MenuItem>
          <MenuItem value='span'>Span</MenuItem>
          <MenuItem value='button'>Button</MenuItem>
          <MenuItem value='p'>P</MenuItem>
          <MenuItem value='h1'>H1</MenuItem>
          <MenuItem value='h2'>H2</MenuItem>
          <MenuItem value='h3'>H3</MenuItem>
          <MenuItem value='h4'>H4</MenuItem>
          <MenuItem value='h5'>H5</MenuItem>
          <MenuItem value='h6'>H6</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  </Grid>
}

export default Edit