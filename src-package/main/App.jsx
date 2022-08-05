import React from 'react'

import Modal from './view/Global.Modal'

import Graph from './view/Page.Graph'
import GraphPure from './view/Page.GraphPure'

import Imitation, { initState } from './utils/imitation'
import { hash, clone } from './utils/common'

import './App.css'

function App(props) {
  const { ref_, onModalChange, onMessageChange } = props

  const [render, setRender] = React.useState()
  const [pure, setPure] = React.useState()

  React.useEffect(() => {
    const r = Imitation.MonitorINS.register(() => onModalChange ? onModalChange(Imitation.state.modalVisible) : null, state => [state.modalVisible])
    return () => r()
  }, [onModalChange])

  React.useEffect(() => {
    const r = Imitation.MonitorINS.register(() => {
      if (onMessageChange && Imitation.state.message) {
        onMessageChange(Imitation.state.message)
        setTimeout(() => Imitation.assignState({ message: '' }))
      }
    }, state => [state.message])
    return () => r()
  }, [onMessageChange])

  React.useMemo(() => {
    if (pure) {
      const { graphContent, graphConfig, graphElement } = Imitation.state

      window.graphContent = clone(graphContent)
      window.graphConfig = clone(graphConfig)
      window.graphElement = clone(graphElement)
    }
    if (!pure) {
      delete window.graphContent
      delete window.graphConfig
      delete window.graphElement
    }
  }, [render, pure])

  const refContent = React.useRef({
    getData: v => {
      const data = { graphContent: Imitation.state.graphContent, graphConfig: Imitation.state.graphConfig }
      return v ? JSON.stringify(data) : data
    },
    setData: v => {
      const data = typeof v === 'string' ? JSON.parse(v) : v
      Imitation.assignState({ graphContent: data.graphContent, graphContentUpdate: hash(), graphConfig: data.graphConfig, graphConfigUpdate: hash() })
    },
    setElementList: v => Imitation.assignState({ graphElement: v, graphElementUpdate: hash() }),
    setRender: v => setRender(v ? hash() : false),
    setPure: v => setPure(v ? true : false),
    initState: () => Imitation.setState(initState()),
  })

  ref_(refContent.current)

  if (!render) return null

  if (!pure) return <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative' }}>
    <Modal />
    <Graph />
  </div>

  if (pure) return <GraphPure />
}

export default App