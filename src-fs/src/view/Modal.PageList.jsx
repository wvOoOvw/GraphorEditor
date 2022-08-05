import React from 'react'
import { useHistory } from 'react-router-dom'

import { Button } from '@mui/material'
import { Switch } from '@mui/material'
import { TextField } from '@mui/material'
import { Paper } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogTitle } from '@mui/material'
import { DialogContent } from '@mui/material'
import { DialogActions } from '@mui/material'
import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemButton } from '@mui/material'
import { ListItemIcon } from '@mui/material'
import { ListItemText } from '@mui/material'
import { IconButton } from '@mui/material'
import { Grid } from '@mui/material'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import SendIcon from '@mui/icons-material/Send'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import Imitation from '../utils/imitation'
import axios from '../utils/axios'

function ModalRename(props) {
  const { onClose, onFetch, content } = props

  const [name, setName] = React.useState(content.name)

  const handleSure = e => {
    axios.put('/page', { _id: content._id, name: name }).then(res => {
      onClose()
      onFetch()
      Imitation.assignState({ message: '重命名成功' })
    })
  }

  return <Dialog open={true} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '720px' } }} onClose={onClose}>
    <DialogTitle>重命名</DialogTitle>

    <DialogContent dividers>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField value={name} onChange={e => setName(e.target.value)} fullWidth autoFocus />
        </Grid>
      </Grid>
    </DialogContent>

    <DialogActions>
      <Button endIcon={<SendIcon />} onClick={handleSure}>确认</Button>
    </DialogActions>
  </Dialog>
}

function ModalDelete(props) {
  const { onClose, onFetch, content } = props

  const handleSure = e => {
    axios.delete('/page', { params: { _id: content._id } }).then(res => {
      onClose()
      onFetch()
      Imitation.assignState({ message: '删除成功' })
    })
  }

  return <Dialog open={true} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '720px' } }} onClose={onClose}>
    <DialogTitle>删除</DialogTitle>

    <DialogContent dividers>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div style={{ fontWeight: 'bold' }}>确定删除： {content.name} ?</div>
        </Grid>
      </Grid>
    </DialogContent>

    <DialogActions>
      <Button endIcon={<SendIcon />} onClick={handleSure}>确认</Button>
    </DialogActions>
  </Dialog>
}

function ModalPublic(props) {
  const { onClose, onFetch, content } = props

  const [type, setType] = React.useState(content.public)

  const handleSure = e => {
    axios.put('/page', { _id: content._id, public: type }).then(res => {
      onClose()
      onFetch()
      Imitation.assignState({ message: '设置成功' })
    })
  }

  return <Dialog open={true} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '720px' } }} onClose={onClose}>
    <DialogTitle>公开</DialogTitle>

    <DialogContent dividers>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold' }}>世界公开：</div>
          <Switch checked={type} onChange={e => setType(e.target.checked)} />
        </Grid>
      </Grid>
    </DialogContent>

    <DialogActions>
      <Button endIcon={<SendIcon />} onClick={handleSure}>确认</Button>
    </DialogActions>
  </Dialog>
}

function App(props) {
  const { onClose } = props

  const push = useHistory().push

  const [visible, setVisible] = React.useState(false)
  const [list, setList] = React.useState([])
  const fetch = () => axios.get('/page').then(res => {
    setList(res.data)
    setVisible(true)
  }).catch(err => {
    onClose()
  })
  React.useEffect(() => { fetch() }, [])

  const [filterText, setFilterText] = React.useState('')

  const [modalDelete, setModalDelete] = React.useState()
  const [modalRename, setModalRename] = React.useState()
  const [modalPublic, setModalPublic] = React.useState()
  const handleDelete = (e, content) => { setModalDelete(content); e.stopPropagation() }
  const handleRename = (e, content) => { setModalRename(content); e.stopPropagation() }
  const handlePublic = (e, content) => { setModalPublic(content); e.stopPropagation() }
  const handleAdd = (e) => { axios.post('/page').then(res => fetch()); e.stopPropagation() }

  const onClick = i => {
    if (i._id) {
      push(`/graph/${i._id}`)
    } else {
      push(`/graph`)
    }
    onClose()
  }

  if (!visible) return null

  return <Dialog open={true} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '840px' } }} onClose={onClose}>
    <DialogContent>

      <div style={{ position: 'relative', marginBottom: 12 }}>
        <TextField fullWidth value={filterText} onChange={e => setFilterText(e.target.value)} label='搜索' />
        <IconButton onClick={handleAdd} style={{ position: 'absolute', right: 12, top: 0, bottom: 0, margin: 'auto', width: 'fit-content', height: 'fit-content' }}><AddOutlinedIcon /></IconButton>
      </div>

      <List style={{ maxHeight: 600, overflow: 'auto' }} component={Paper}>
        {
          [{ name: '本地', _id: '' }, ...list].filter(i => i.name.includes(filterText)).map(i => {
            return <ListItem>
              <ListItemButton onClick={e => onClick(i)}>
                <ListItemText sx={{ '& .MuiTypography-root': { fontWeight: 'bold' } }}>{i.name}</ListItemText>
                {
                  i._id ?
                    <ListItemIcon>
                      <IconButton onClick={e => handleDelete(e, i)}><DeleteIcon /></IconButton>
                      <IconButton onClick={e => handleRename(e, i)}><DriveFileRenameOutlineIcon /></IconButton>
                      {
                        i.public ?
                          <IconButton onClick={e => handlePublic(e, i)}><VisibilityIcon /></IconButton>
                          :
                          <IconButton onClick={e => handlePublic(e, i)}><VisibilityOffIcon /></IconButton>
                      }
                    </ListItemIcon> : null
                }
              </ListItemButton>
            </ListItem>
          })
        }
      </List>

    </DialogContent>

    {
      modalRename ? <ModalRename onClose={() => setModalRename(undefined)} onFetch={fetch} content={modalRename} /> : null
    }
    {
      modalDelete ? <ModalDelete onClose={() => setModalDelete(undefined)} onFetch={fetch} content={modalDelete} /> : null
    }
    {
      modalPublic ? <ModalPublic onClose={() => setModalPublic(undefined)} onFetch={fetch} content={modalPublic} /> : null
    }
  </Dialog>
}

export default App