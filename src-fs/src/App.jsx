import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Default from './view/Page.Default'
import Graph from './view/Page.Graph'
import GraphPure from './view/Page.GraphPure'
import World from './view/Page.World'
import Message from './view/Component.Message'
import Spin from './view/Component.Spin'

import Imitation from './utils/imitation'

function App() {

  React.useEffect(() => {
    if (!localStorage.getItem('token') || !localStorage.getItem('account')) {
      localStorage.removeItem('token')
      localStorage.removeItem('account')
      return
    } else {
      Imitation.assignState({ userInformation: { token: localStorage.getItem('token'), account: localStorage.getItem('account') } })
    }
  }, [])

  return <HashRouter>
    <Message />
    <Spin />

    <Switch>
      <Route path='/' exact><Default /></Route>

      <Route path='/graph' exact><Graph /></Route>
      <Route path='/graph/:_id' exact><Graph /></Route>
      <Route path='/graphpure' exact><GraphPure /></Route>
      <Route path='/graphpure/:_id' exact><GraphPure /></Route>

      <Route path='/world' exact><World /></Route>
      <Route path='/world/:_id' exact><World /></Route>
    </Switch>
  </HashRouter>
}

export default App