import React from 'react'
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  if (env === 'dev') {
    return <List {...devParams}>
      {
        property.value.map((i, index) => {
          return <ListItem disablePadding={property.disablePadding} key={index}>
            <ListItemText primary={i.primary} secondary={i.secondary} />
          </ListItem>
        })
      }
    </List>
  }

  if (env === 'prod') {
    return <List>
      {
        property.value.map((i, index) => {
          return <ListItem disablePadding={property.disablePadding} key={index}>
            <ListItemText primary={i.primary} secondary={i.secondary} />
          </ListItem>
        })
      }
    </List>
  }
}

export default Render