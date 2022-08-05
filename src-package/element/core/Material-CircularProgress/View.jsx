import React from 'react'

import { CircularProgress } from '@mui/material'

function View() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <CircularProgress></CircularProgress>
  </div>
}

export default View