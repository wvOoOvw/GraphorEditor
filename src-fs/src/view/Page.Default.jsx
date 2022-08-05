import React from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from '@mui/material'

function App() {
  const push = useHistory().push

  return <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, margin: 'auto', width: 'fit-content', height: 'fit-content' }}>
    <Button variant='contained' color='inherit' style={{ margin: '0 16px' }} onClick={e => push('/graph')}>搭建</Button>
    <Button variant='contained' color='inherit' style={{ margin: '0 16px' }} onClick={e => push('/world')}>世界</Button>
  </div>
}

export default App