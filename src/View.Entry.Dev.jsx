import React from 'react'

import NavigationBar from './View.NavigationBar'
import NavigationTabs from './View.NavigationTabs'
import GraphDev from './View.Graph.Dev'

import { GraphElement, GraphExample } from './utils.package'
import Imitation from './utils.imitation'
import { hash } from './utils.common'

function App() {
  const [visible, setVisible] = React.useState()

  React.useEffect(() => {
    Imitation.assignState({ graphElement: GraphElement, graphElementUpdate: hash() })

    const cache = localStorage.getItem('graphCache')

    if (cache) {
      const data = JSON.parse(cache)
      Imitation.assignState({ graphContent: data.graphContent, graphContentUpdate: hash(), graphConfig: data.graphConfig, graphConfigUpdate: hash() })
    }

    setVisible(true)
  }, [])

  if (visible === undefined) return null

  return <div style={{ width: 'calc(100% - 32px)', height: window.innerHeight - 32, display: 'flex', flexDirection: 'column', padding: 16 }}>
    <div style={{ marginBottom: 16 }}>
      <NavigationBar />
    </div>
    <div style={{ width: '100%', height: 0, flexGrow: 1, display: 'flex' }}>
      <div style={{ width: 'fit-content', height: '100%', marginRight: 16 }}>
        <NavigationTabs />
      </div>
      <div style={{ width: 0, height: '100%', flexGrow: 1 }}>
        <GraphDev />
      </div>
    </div>
  </div>
}

export default App