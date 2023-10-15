import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import EntryDev from './View.Entry.Dev'
import EntryProd from './View.Entry.Prod'

import Loading from './View.Global.Loading'
import Message from './View.Global.Message'

function App() {
  return <>
    <Loading />
    <Message />

    <HashRouter>
      <Switch>
        <Route path='/' exact><EntryDev /></Route>
        <Route path='/dev' exact><EntryDev /></Route>
        <Route path='/prod' exact><EntryProd /></Route>
      </Switch>
    </HashRouter>
  </>
}

export default App