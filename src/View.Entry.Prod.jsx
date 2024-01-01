import React from 'react'

import GraphProd from './View.Graph.Prod'

import graphElement from '../src-element/index'

import Imitation from './utils.imitation'
import { hash } from './utils.common'

function App() {
  const [visible, setVisible] = React.useState()

  React.useEffect(() => {
    Imitation.assignState({ graphElement: graphElement, graphElementUpdate: hash() })

    const cache = localStorage.getItem('graphCache')

    if (cache) {
      const data = JSON.parse(cache)

      Imitation.assignState({ graphContent: data.graphContent, graphContentUpdate: hash(), graphConfig: data.graphConfig, graphConfigUpdate: hash() })

      const { graphContent, graphConfig, graphElement } = Imitation.state

      window.graphContent = graphContent
      window.graphConfig = graphConfig
      window.graphElement = graphElement
    }

    setVisible(true)
  }, [])

  if (visible === undefined) return null

  return <GraphProd />
}

export default App