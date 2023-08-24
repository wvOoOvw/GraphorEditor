import React from 'react'

import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { Divider } from '@mui/material'
import { Tooltip } from '@mui/material'
import { Paper } from '@mui/material'
import GraphDev from './View.Graph.Dev'
import EventDev from './View.Event.Dev'

import Imitation from './utils.imitation'

function App() {
  return <Paper
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      background: 'rgba(235,235,235)'
    }}
  >

  </Paper>
}

export default Imitation.withBindRender(App, state => [state.navigationTabsValue])