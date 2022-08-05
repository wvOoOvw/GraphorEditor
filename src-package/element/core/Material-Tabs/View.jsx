import React from 'react'

import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'

function View() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Tabs showLabels style={{ transform: 'scale(0.7)' }}>
      <Tab label='***'></Tab>
    </Tabs>
  </div>
}

export default View