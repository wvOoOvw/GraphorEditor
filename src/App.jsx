import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import EntryDev from './View.Entry.Dev'
import EntryProd from './View.Entry.Prod'

import Loading from './View.Global.Loading'
import Message from './View.Global.Message'
import Drag from './View.Global.Drag'

import Imitation from './utils.imitation'

function App() {
  return <ThemeProvider theme={createTheme(Imitation.state.theme)}>
    <HashRouter>
      <Loading />
      <Message />
      {/* <Drag /> */}

      <Switch>
        <Route path='/' exact><EntryDev /></Route>
        <Route path='/dev' exact><EntryDev /></Route>
        <Route path='/prod' exact><EntryProd /></Route>
      </Switch>
    </HashRouter>
  </ThemeProvider>
}

export default Imitation.withBindComponent(App, state => [JSON.stringify(state.theme)])