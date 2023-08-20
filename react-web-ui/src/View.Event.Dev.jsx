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
  return null
}

export default Imitation.withBindRender(App, state => [state.navigationTabsValue])