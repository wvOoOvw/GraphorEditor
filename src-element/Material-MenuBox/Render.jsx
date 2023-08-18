import React from 'react'
import { Menu, MenuItem } from '@mui/material'

function Render(props) {
  const { event, style, property, monitor, trigger, children, env, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setValues) {
      const remove = monitor.setValues(data => {
        property.list = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onClose = () => {
    if (env === 'dev') return
    if (property.enableClose === false) return
    property.open = false
    update()
  }

  const onOpen = () => {
    if (env === 'dev') return
    property.open = true
    update()
  }

  const ref = React.useRef()

  return <>
    <div {...event} {...style} ref={el => ref.current = el} onClick={onOpen}>
      {
        children && children.main ? children.main() : null
      }
    </div>
    <Menu open={env === 'prod' && property.open} onClose={onClose} anchorEl={ref.current}>
      <div onClick={onClose}>
        {
          children && children.menu ? children.menu() : null
        }
      </div>
    </Menu>
  </>
}

export default Render