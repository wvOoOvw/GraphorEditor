import React from 'react'

import { Select } from '@mui/material'
import { MenuItem } from '@mui/material'

function View() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Select {...sx.SelectSX} size='small' fullWidth>
      <MenuItem value='0'>***</MenuItem>
    </Select>
  </div>
}

export default View