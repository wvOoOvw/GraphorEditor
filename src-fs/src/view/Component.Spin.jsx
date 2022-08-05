import React from 'react'

import { Backdrop } from '@mui/material'
import { CircularProgress } from '@mui/material'

import Imitation from '../utils/imitation'

function App() {
  const [visible, setVisible] = React.useState(false)

  const s = React.useRef(null)

  React.useEffect(() => {
    if (Imitation.state.xhrLoading) {
      setVisible(true)
      if (s.current) clearTimeout(s.current)
    }
    if (!Imitation.state.xhrLoading) {
      if (s.current) clearTimeout(s.current)
      s.current = setTimeout(() => {
        setVisible(false)
        s.current = null
      }, 500)
    }
  }, [Imitation.state.xhrLoading])

  return visible ? <Backdrop open={true} style={{ color: '#fff', zIndex: 10000 }}><CircularProgress color='inherit' /></Backdrop> : null
}

export default Imitation.withBindRender(App, state => [state.xhrLoading])