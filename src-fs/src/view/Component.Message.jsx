import React from 'react'

import { Snackbar } from '@mui/material'

import Imitation from '../utils/imitation'

function App() {
  const s = React.useRef(null)

  React.useEffect(() => {
    if (Imitation.state.message) {
      if (s.current) clearTimeout(s.current)
      s.current = setTimeout(() => {
        Imitation.assignState({ message: '' })
        s.current = null
      }, 1500)
    }
  }, [Imitation.state.message])

  return <Snackbar open={Imitation.state.message ? true : false} message={Imitation.state.message} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} />
}

export default Imitation.withBindRender(App, state => [state.message])