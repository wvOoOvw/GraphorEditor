import React from 'react'

import Snackbar from '@mui/material/Snackbar'

import Imitation from './utils.imitation'

function App() {
  const s = React.useRef(null)

  React.useEffect(() => {
    if (!Imitation.state.message) return

    if (s.current) clearTimeout(s.current)

    s.current = setTimeout(() => { Imitation.assignState({ message: '' }); s.current = null }, 2000)
  }, [Imitation.state.message])

  return <Snackbar open={Imitation.state.message ? true : false} message={Imitation.state.message} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} className='font'/>
}

export default Imitation.withBindComponent(App, state => [state.message])