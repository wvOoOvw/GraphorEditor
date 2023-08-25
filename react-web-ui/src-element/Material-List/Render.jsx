import React from 'react'
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <List {...params}>
    {
      property.value.map((i, index) => {
        return <ListItem disablePadding={property.disablePadding} key={index}>
          <ListItemText primary={i.title} secondary={i.desciption} />
        </ListItem>
      })
    }
  </List>
}

export default Render