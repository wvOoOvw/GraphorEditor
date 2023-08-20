import React from 'react'

import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { Divider } from '@mui/material'
import { Tooltip } from '@mui/material'
import { Paper } from '@mui/material'

import GraphDev from './View.Graph.Dev'
import EventDev from './View.Event.Dev'

import Imitation from './utils.imitation'

function Fade(props) {
  const [opacity, setOpacity] = React.useState(0)

  React.useEffect(() => requestAnimationFrame(() => setOpacity(1)), [])

  return <div style={{ width: '100%', height: '100%', opacity: opacity, transition: '0.5s all' }}>{props.children}</div>
}

function App() {

  // if (Imitation.state.navigationTabsValue === 'ElementEvent') return <Fade key={1}><EventDev /></Fade>

  return <Fade key={2}><GraphDev /></Fade>
}

export default Imitation.withBindRender(App, state => [state.navigationTabsValue])