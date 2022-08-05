import React from 'react'

import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemText } from '@mui/material'
import { ListItemButton } from '@mui/material'

function View() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <List style={{ transform: 'scale(0.6)' }}>
      <ListItemButton>
        <ListItem disablePadding>
          <ListItemText primary='***' secondary='******' />
        </ListItem>
      </ListItemButton>
      <ListItemButton>
        <ListItem disablePadding>
          <ListItemText primary='***' secondary='******' />
        </ListItem>
      </ListItemButton>
    </List>
  </div>
}

export default View