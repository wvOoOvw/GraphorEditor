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
  const [current, setCurrent] = React.useState('')

  React.useEffect(() => {
    if (current === '' && Imitation.state.navigationTabsValue === '') setCurrent('Graph')

    if (['ElementShop', 'ElementOverview'].includes(Imitation.state.navigationTabsValue)) setCurrent('Graph')

    if (['ElementEvent'].includes(Imitation.state.navigationTabsValue)) setCurrent('Event')

  }, [Imitation.state.navigationTabsValue])

  if (current === 'Graph') return <GraphDev />
  if (current === 'Event') return <EventDev />

  return null
}

export default Imitation.withBindRender(App, state => [state.navigationTabsValue])