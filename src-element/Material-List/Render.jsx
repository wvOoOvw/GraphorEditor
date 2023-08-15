import React from 'react'

function Render(props) {
  const { List, ListItem, ListItemButton, ListItemText } = window.MaterialUI

  const { event, property, monitor, trigger, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onClick = (e, value) => {
    if (trigger && trigger.onClick) trigger.onClick(value, e)
  }

  return <List {...event}>
    {
      property.value.map((i, index) => {
        return <ListItem disablePadding={property.disablePadding} key={index}>
          <ListItemButton onClick={(e) => onClick(e, i)}>
            <ListItemText primary={i.title} secondary={i.desciption} />
          </ListItemButton>
        </ListItem>
      })
    }
  </List>
}

export default Render