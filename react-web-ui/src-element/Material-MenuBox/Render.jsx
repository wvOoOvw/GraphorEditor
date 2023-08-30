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

  const onClose = () => {
    property.open = false
    update()
  }

  const onOpen = () => {
    property.open = true
    update()
  }

  if (env === 'dev') {
    return <>
      <div {...devParams}>
        <div>
          {
            children && children.main ? children.main() : null
          }
        </div>
        <div>
          {
            children && children.menu ? children.menu() : null
          }
        </div>
      </div>
    </>
  }

  if (env === 'prod') {
    return <>
      <div {...devParams} onClick={onOpen} ref={el => ref.current = el}>
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
}

export default Render