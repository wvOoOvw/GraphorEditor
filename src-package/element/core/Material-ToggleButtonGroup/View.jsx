import React from 'react'

import { ToggleButtonGroup } from '@mui/material'
import { ToggleButton } from '@mui/material'

function View() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <ToggleButtonGroup size='small'>
      <ToggleButton>
        ***
      </ToggleButton>
      <ToggleButton>
        ***
      </ToggleButton>
    </ToggleButtonGroup>
  </div>
}

export default View