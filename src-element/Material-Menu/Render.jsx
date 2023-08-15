import React from 'react'
import { MenuList, MenuItem } from '@mui/material'

function Render(props) {
  const { event, style, property, monitor, trigger, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setValues) {
      const remove = monitor.setValues(data => {
        property.list = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onClick = (e, value) => {
    if (trigger && trigger.onClick) trigger.onClick(value, e)
  }

  return <MenuList {...event}>
    {
      property.options.map((i, index) => {
        return <MenuItem key={index} onClick={e => onClick(e, i.value)}>
          {
            i.label
          }
        </MenuItem>
      })
    }
  </MenuList>
}

export default Render