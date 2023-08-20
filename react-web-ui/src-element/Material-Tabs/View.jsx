import React from 'react'

import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'

function View() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Tabs>
      <Tab label='Tab A'></Tab>
      <Tab label='Tab B'></Tab>
    </Tabs>
  </div>
}

export default View