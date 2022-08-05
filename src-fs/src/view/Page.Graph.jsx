import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { IconButton } from '@mui/material'
import { Tooltip } from '@mui/material'
import { Button } from '@mui/material'
import { Grid } from '@mui/material'
import { Divider } from '@mui/material'

import SaveIcon from '@mui/icons-material/Save'
import ClearAllIcon from '@mui/icons-material/ClearAll'
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode'
import DataSaverOffIcon from '@mui/icons-material/DataSaverOff'

import { GraphMain, GraphElement, GraphExample } from '../utils/graph.package'

import Imitation from '../utils/imitation'
import axios from '../utils/axios'

import ModalPageList from './Modal.PageList'
import ModalPagePublish from './Modal.PagePublish'
import ModalLogin from './Modal.Login'

function Help(props) {
  const { graphRef } = props

  const { _id } = useParams()
  const push = useHistory().push

  const handleSave = () => {
    if (_id) {
      axios.put('/page', { _id, data: graphRef.current.getData(true) }).then(res => {
        Imitation.assignState({ message: '保存成功' })
      })
    } else {
      localStorage.setItem('graphCache', graphRef.current.getData(true))
      Imitation.assignState({ message: '保存成功' })
    }
  }
  const handleClear = () => {
    graphRef.current.initState()
    graphRef.current.setElementList(GraphElement)
    graphRef.current.setRender(true)
  }
  const handleDev = () => {
    if (_id) {
      window.open(location.origin + location.pathname + '#/graphpure/' + _id)
    } else {
      window.open(location.origin + location.pathname + '#/graphpure')
    }
  }
  const handlePublish = () => {
    setModalVisible('ModalPagePublish')
  }

  const actions = [
    { icon: <SaveIcon />, name: '保存', click: handleSave },
    { icon: <ClearAllIcon />, name: '清空', click: handleClear },
    { icon: <DeveloperModeIcon />, name: '拟真调试', click: handleDev },
    { icon: <DataSaverOffIcon />, name: '发布', click: handlePublish },
  ]

  const [modalVisible, setModalVisible] = React.useState()
  const exampleClick = i => {
    graphRef.current.setData(i.value)
    graphRef.current.setRender(true)
    setModalVisible()
  }

  const [name, setName] = React.useState('')

  const fetch = () => {
    if (_id) {
      axios.get('/page', { params: { _id } }).then(res => {
        if (res.data.data) graphRef.current.setData(res.data.data)
        if (res.data.name) setName(res.data.name)
        graphRef.current.setRender(true)
      })
    } else {
      if (localStorage.getItem('graphCache')) graphRef.current.setData(localStorage.getItem('graphCache'))
      setName('本地')
      graphRef.current.setRender(true)
    }
  }

  React.useEffect(() => {
    graphRef.current.setElementList(GraphElement)
    fetch()
    return () => { graphRef.current.initState() }
  }, [_id])

  return <div style={{ width: 'calc(100% - 32px)', height: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', position: 'relative' }}>
    <Grid container spacing={1} style={{ width: 'fit-content' }}>
      <Grid item>
        <Button color='inherit' style={{ fontWeight: 'bold' }} onClick={e => push('/')}>Graphor</Button>
      </Grid>
      {
        Imitation.state.userInformation.account ?
          <Grid item>
            <Button color='inherit' onClick={() => setModalVisible('ModalLogin')}>{Imitation.state.userInformation.account}</Button>
          </Grid>
          :
          <Grid item>
            <Button color='inherit' onClick={() => setModalVisible('ModalLogin')}>登陆 / 注册</Button>
          </Grid>
      }
    </Grid>
    <Grid container spacing={1} alignItems='center' style={{ width: 'fit-content' }}>
      {
        actions.map(i => {
          return <Grid item>
            <Tooltip arrow title={i.name}>
              <IconButton onClick={i.click}>{i.icon}</IconButton>
            </Tooltip>
          </Grid>
        })
      }
      {
        name ?
          <Grid item>
            <Button color='inherit' style={{ fontWeight: 'bold' }} onClick={() => setModalVisible('ModalPageList')}>{name}</Button>
          </Grid>
          : null
      }
    </Grid>

    <Divider style={{ position: 'absolute', left: 0, bottom: 0, width: '100%' }} />

    {
      modalVisible === 'ModalPageList' ? <ModalPageList onClose={() => setModalVisible()} /> : null
    }
    {
      modalVisible === 'ModalPagePublish' ? <ModalPagePublish onClose={() => setModalVisible()} graphRef={graphRef} name={name} /> : null
    }
    {
      modalVisible === 'ModalLogin' ? <ModalLogin onClose={() => setModalVisible()} /> : null
    }
    {
      modalVisible === 'ModalExample' ? <ModalExample onClose={() => setModalVisible()} list={GraphExample} onClick={exampleClick} /> : null
    }

  </div >
}

function Graph(props) {
  const { graphRef } = props

  const onMessageChange = e => {
    Imitation.assignState({ message: e })
  }

  return <div style={{ width: '100%', height: 'calc(100% - 50px)', background: 'white', position: 'relative' }}>
    <GraphMain ref_={e => graphRef.current = e} onMessageChange={onMessageChange} />
  </div>
}

function App() {
  const graphRef = React.useRef()

  return <div style={{ width: '100%', height: '100vh' }}>
    <Help graphRef={graphRef} />
    <Graph graphRef={graphRef} />
  </div>
}

export default Imitation.withBindRender(App, state => [state.userInformation])