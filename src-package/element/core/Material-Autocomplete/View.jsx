import React from 'react'

import { TextField } from '@mui/material'
import { Autocomplete } from '@mui/material'

function View() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Autocomplete
      fullWidth
      options={['***', '***']}
      size='small'
      renderInput={(params) => <TextField {...params} />}
    />
  </div>
}

export default View