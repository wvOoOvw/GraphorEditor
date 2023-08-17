import React from 'react'

import { List } from '@mui/material'
import { ListItem } from '@mui/material'
import { ListItemText } from '@mui/material'
import { ListItemButton } from '@mui/material'

function View() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <List>
      <ListItemButton>
        <ListItem disablePadding>
          <ListItemText primary='Text' secondary='Sub Text' />
        </ListItem>
      </ListItemButton>
      <ListItemButton>
        <ListItem disablePadding>
          <ListItemText primary='Text' secondary='Sub Text' />
        </ListItem>
      </ListItemButton>
    </List>
  </div>
}

export default View