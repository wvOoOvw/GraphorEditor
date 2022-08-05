import React from 'react'
import { useParams } from 'react-router-dom'

import { GraphMain, GraphElement, GraphExample } from '../utils/graph.package'

import axios from '../utils/axios'

function App() {
  const { _id } = useParams()

  const graphRef = React.useRef()

  const fetch = () => {
    if (_id) {
      axios.get('/page', { params: { _id } }).then(res => {
        if (res.data.data) graphRef.current.setData(res.data.data)
        graphRef.current.setRender(true)
      })
    } else {
      if (localStorage.getItem('graphCache')) graphRef.current.setData(localStorage.getItem('graphCache'))
      graphRef.current.setRender(true)
    }
  }

  React.useEffect(() => {
    graphRef.current.setPure(true)
    graphRef.current.setElementList(GraphElement)
    fetch()
    return () => { graphRef.current.initState() }
  }, [])

  return <GraphMain ref_={e => graphRef.current = e} />
}

export default App