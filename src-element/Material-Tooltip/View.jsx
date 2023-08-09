import React from 'react'

import { Tooltip } from '@mui/material'

function View() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Tooltip title='******'>
      <div>***</div>
    </Tooltip>
  </div>
}

export default View