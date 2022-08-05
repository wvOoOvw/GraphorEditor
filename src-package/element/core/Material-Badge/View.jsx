import React from 'react'

import { Badge } from '@mui/material'

function View() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Badge badgeContent={1} color='primary'>
      ***
    </Badge>
  </div>
}

export default View