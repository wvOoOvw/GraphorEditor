import React from 'react'

import GraphProd from './View.Graph.Prod'

import { GraphElement } from './utils.package'
import Imitation from './utils.imitation'
import { hash, clone } from './utils.common'

function App() {
  const [visible, setVisible] = React.useState()

  React.useEffect(() => {
    Imitation.assignState({ graphElement: GraphElement, graphElementUpdate: hash() })

    const cache = localStorage.getItem('graphCache')

    if (cache) {
      const data = JSON.parse(cache)

      Imitation.assignState({ graphContent: data.graphContent, graphContentUpdate: hash(), graphConfig: data.graphConfig, graphConfigUpdate: hash() })

      const { graphContent, graphConfig, graphElement } = Imitation.state

      window._graphContent = clone(graphContent)
      window._graphConfig = clone(graphConfig)
      window._graphElement = clone(graphElement)
    }

    setVisible(true)
  }, [])

  if (visible === undefined) return null

  return <GraphProd />
}

export default App