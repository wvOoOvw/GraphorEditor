import React from 'react'
import { MenuList, MenuItem } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

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

  if (env === 'dev') {
    return <MenuList {...devParams}>
      {
        property.options.map((i, index) => {
          return <MenuItem key={index}>
            {
              i.label
            }
          </MenuItem>
        })
      }
    </MenuList>
  }

  if (env === 'prod') {
    return <MenuList {...devParams}>
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
}

export default Render