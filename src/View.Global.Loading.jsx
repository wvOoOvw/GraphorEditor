import React from 'react'

import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

import Imitation from './utils.imitation'

function App() {
  const [visible, setVisible] = React.useState(false)

  const s = React.useRef(null)

  React.useEffect(() => {
    if (s.current) clearTimeout(s.current)

    if (Imitation.state.loading) {
      setVisible(true)
    }

    if (!Imitation.state.loading) {
      s.current = setTimeout(() => { setVisible(false); s.current = null }, 500)
    }
  }, [Imitation.state.loading])

  return visible ? <Backdrop open={true} style={{ color: '#fff', zIndex: 10000 }}><CircularProgress color='inherit' /></Backdrop> : null
}

export default Imitation.withBindComponent(App, state => [state.loading])