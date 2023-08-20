import React from 'react'

import NavigationBar from './View.NavigationBar'
import NavigationTabs from './View.NavigationTabs'
import NavigationContent from './View.NavigationContent'

import { GraphElement, GraphExample } from './utils.package'
import Imitation from './utils.imitation'
import { hash } from './utils.common'

function App() {
  const [visible, setVisible] = React.useState()
  const [height, setHeight] = React.useState()

  React.useEffect(() => {
    Imitation.state.graphElement = GraphElement
    Imitation.state.graphElementUpdate = hash()

    const cache = localStorage.getItem('graphCache') ? JSON.parse(localStorage.getItem('graphCache')) : undefined

    if (cache) {
      Imitation.state.graphContent = cache.graphContent
      Imitation.state.graphConfig = cache.graphConfig
      Imitation.state.graphContentUpdate = hash()
      Imitation.state.graphConfigUpdate = hash()
    }

    Imitation.dispatch()

    setVisible(true)
  }, [])

  React.useEffect(() => {
    const event = () => {
      setHeight(window.innerHeight - 32)
    }

    event()

    window.addEventListener('resize', event)

    return () => window.removeEventListener('resize', event)
  }, [])

  if (visible === undefined || height === undefined) return null

  return <div style={{ width: 'calc(100% - 32px)', height: height, display: 'flex', flexDirection: 'column', padding: 16 }}>
    <div style={{ marginBottom: 16 }}>
      <NavigationBar />
    </div>
    <div style={{ width: '100%', height: 0, flexGrow: 1, display: 'flex' }}>
      <div style={{ width: 'fit-content', height: '100%', marginRight: 16 }}>
        <NavigationTabs />
      </div>
      <div style={{ width: 0, height: '100%', flexGrow: 1 }}>
        <NavigationContent />
      </div>
    </div>
  </div>
}

export default App