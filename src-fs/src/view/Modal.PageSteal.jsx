import React from 'react'

import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { Dialog } from '@mui/material'
import { DialogContent } from '@mui/material'
import { DialogActions } from '@mui/material'
import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemIcon } from '@mui/material'
import { ListItemText } from '@mui/material'
import { ListItemButton } from '@mui/material'
import { Switch } from '@mui/material'

import axios, { baseIp } from '../utils/axios'
import { downloadFile } from '../utils/common'
import { simpleify, resumeifyString, styleToClass, elementOrigin } from '../utils/publish'

function App(props) {
  const { onClose, graphRef } = props

  const [url, setUrl] = React.useState('')

  const [option, setOption] = React.useState({ load: false, copy: true })

  const handlePublish = async () => {

  }

  const switchActions = [
    { name: '加载到当前页面', value: 'load' },
    { name: '复制', value: 'copy' },
  ]

  return <Dialog open={true} sx={{ '& .MuiDialog-paper': { width: '100%', maxWidth: '720px' } }} onClose={onClose}>
    <DialogContent dividers>
      <TextField fullWidth value={url} onChange={e => setUrl(e.target.value)} />
      <List>
        {
          switchActions.map(i => {
            return <ListItem>
              <ListItemButton>
                <ListItemText sx={{ '& .MuiTypography-root': { fontWeight: 'bold' } }}>{i.name}</ListItemText>
                <ListItemIcon>
                  <Switch checked ={option[i.value]} onChange={e => setOption(pre => Object.assign(pre, { [i.value]: e.target.checked }))}></Switch>
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          })
        }
      </List>
    </DialogContent>

    <DialogActions>
      <Button variant='contained' onClick={handlePublish}>发布</Button>
    </DialogActions>
  </Dialog>
}

export default App