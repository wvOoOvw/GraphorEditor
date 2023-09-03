import React from 'react'

import GraphProd from './View.Graph.Prod'

import GraphElement from '../src-element/index'

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

      window.graphContent = clone(graphContent)
      window.graphConfig = clone(graphConfig)
      window.graphElement = clone(graphElement)
    }

    setVisible(true)
  }, [])

  if (visible === undefined) return null

  return <GraphProd />
}

export default App