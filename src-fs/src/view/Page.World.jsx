import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { IconButton } from '@mui/material'
import { Tooltip } from '@mui/material'
import { Button } from '@mui/material'
import { Grid } from '@mui/material'
import { Divider } from '@mui/material'
import { TextField } from '@mui/material'
import { Paper } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogContent } from '@mui/material'
import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemButton } from '@mui/material'
import { ListItemText } from '@mui/material'

import CopyAllIcon from '@mui/icons-material/CopyAll'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'

import { GraphMain, GraphElement, GraphExample } from '../utils/graph.package'

import Imitation from '../utils/imitation'
import axios from '../utils/axios'
import { copy } from '../utils/common'

function ModalList(props) {
  const { onClose } = props

  const push = useHistory().push

  const [visible, setVisible] = React.useState(false)
  const [filterText, setFilterText] = React.useState('')
  const [list, setList] = React.useState([])

  React.useEffect(() => {
    axios.get('/world').then(res => {
      setList(res.data.sort((a, b) => b.time - a.time))
      setVisible(true)
    })
  }, [])

  const onClick = e => {
    push('/world/' + e._id)
    onClose()
  }

  if (!visible) return null

  return <Dialog open={true} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '840px' } }} onClose={onClose}>
    <DialogContent>

      <div style={{ position: 'relative', marginBottom: 12 }}>
        <TextField fullWidth value={filterText} onChange={e => setFilterText(e.target.value)} label='搜索' />
      </div>

      <List style={{ maxHeight: '336px', overflow: 'auto' }} component={Paper}>
        {
          list.filter(i => i.name.includes(filterText)).map(i => {
            return <ListItem>
              <ListItemButton style={{ width: '100%' }} onClick={e => onClick(i)}>
                <ListItemText sx={{ '& .MuiTypography-root': { fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' } }}>{i.name}</ListItemText>
                <ListItemText sx={{ '& .MuiTypography-root': { fontWeight: 'bold', textAlign: 'right' } }}>{i.time ? new Date(i.time).toLocaleDateString() : ''}</ListItemText>
              </ListItemButton>
            </ListItem>
          })
        }
      </List>

    </DialogContent>
  </Dialog>
}

function Help(props) {
  const { data, setData, setModalVisible } = props

  const { _id } = useParams()
  const push = useHistory().push

  const fetch = () => {
    axios.get('/world', { params: { _id } })
      .then(res => {
        setData(res.data)
      }).catch(err => {
        Imitation.assignState({ message: '访问异常' })
        setData()
      })
  }

  React.useEffect(() => {
    if (_id) fetch()
  }, [_id])

  const handleCopy = () => {
    copy(data.data, () => { Imitation.assignState({ message: '复制到剪切板' }) })
  }

  const actions = [
    { icon: <CopyAllIcon />, name: '复制数据', click: handleCopy },
  ]

  return <div style={{ width: '100%', height: 50, overflow: 'auto', padding: '0 16px', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

    <Grid container spacing={1} alignItems='center' flexWrap='nowrap' style={{ width: 'fit-content', flexShrink: 0 }}>
      <Grid item>
        <Button color='inherit' style={{ fontWeight: 'bold' }} onClick={e => push('/')}>Graphor World</Button>
      </Grid>
    </Grid>

    <Grid container spacing={1} alignItems='center' flexWrap='nowrap' style={{ width: 'fit-content', flexShrink: 0 }}>
      {
        data ?
          actions.map(i => {
            return <Grid item>
              <Tooltip arrow title={i.name}>
                <IconButton onClick={i.click}>{i.icon}</IconButton>
              </Tooltip>
            </Grid>
          })
          : null
      }
      {
        data ?
          <Grid item>
            <Button color='inherit' style={{ fontWeight: 'bold' }} onClick={e => setModalVisible('ModalList')}>{data.name}</Button>
          </Grid>
          : null
      }
    </Grid>

  </div>
}

function Graph(props) {
  const { data } = props

  const graphRef = React.useRef()

  const onMessageChange = e => {
    Imitation.assignState({ message: e })
  }

  React.useEffect(() => {
    if (!data) return

    graphRef.current.setPure(true)
    graphRef.current.setElementList(GraphElement)
    graphRef.current.setData(data.data)
    graphRef.current.setRender(true)

    return () => {
      graphRef.current.initState()
    }
  }, [data])

  return <div style={{ width: '100%', height: 'calc(100% - 50px)', background: 'white', position: 'relative', overflow: 'hidden', display: data ? 'block' : 'none' }}>
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <GraphMain ref_={e => graphRef.current = e} onMessageChange={onMessageChange} />
    </div>
  </div>
}

function App() {
  const [data, setData] = React.useState()

  const [modalVisible, setModalVisible] = React.useState()

  return <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
    <Help data={data} setData={setData} setModalVisible={setModalVisible} />

    <Graph data={data} />

    {
      !data ?
        <div style={{ margin: 'auto', width: 'fit-content', height: 'fit-content', marginTop: 200, textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold', marginBottom: 24 }}>进入世界 Enter the World</div>
          <Button variant='contained' color='inherit' onClick={e => setModalVisible('ModalList')}>菜单</Button>
        </div>
        : null
    }

    {
      modalVisible === 'ModalList' ? <ModalList onClose={() => setModalVisible()} /> : null
    }

  </div>
}

export default Imitation.withBindRender(App, state => [state.userInformation])