import React from 'react'
import { Menu, MenuItem } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  const ref = React.useRef()

  React.useEffect(() => {
    if (monitor && monitor.setValues) {
      const remove = monitor.setValues(data => {
        property.list = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.openMenu) {
      const remove = monitor.openMenu(data => {
        property.open = true
        update()
        if (trigger && trigger.onOpen) trigger.onOpen(property.open)
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.closeMenu) {
      const remove = monitor.closeMenu(data => {
        property.open = false
        update()
        if (trigger && trigger.onClose) trigger.onClose(property.open)
      })
      return () => { remove() }
    }
  }, [])

  const onOpen = () => {
    property.open = true
    update()
    if (trigger && trigger.onOpen) trigger.onOpen(property.open)
  }

  const onClose = () => {
    property.open = false
    update()
    if (trigger && trigger.onClose) trigger.onClose(property.open)
  }

  if (env === 'dev') {
    return <>
      <div>
        <div>
          {
            children && children.menuContent ? children.menuContent() : null
          }
        </div>
        <div>
          {
            children && children.menuPopup ? children.menuPopup() : null
          }
        </div>
      </div>
    </>
  }

  if (env === 'prod') {
    return <>
      <div {...devParams} onClick={onOpen} ref={el => ref.current = el}>
        {
          children && children.menuContent ? children.menuContent(prop) : null
        }
      </div>
      <Menu open={env === 'prod' && property.open} onClose={onClose} anchorEl={ref.current}>
        <div onClick={onClose}>
          {
            children && children.menuPopup ? children.menuPopup(prop) : null
          }
        </div>
      </Menu>
    </>
  }
}

export default Render