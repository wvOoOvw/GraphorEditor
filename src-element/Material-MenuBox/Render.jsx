import React from 'react'
import { Menu, MenuItem } from '@mui/material'

function Render(props) {
  const { event, property, monitor, trigger, children, env, update } = props

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
    if (property.enableClose === false) return
    onClose()
    if (trigger && trigger.onClick) trigger.onClick(value, e)
  }

  const onClose = () => {
    if (property.enableClose === false) return
    property.open = false
    update()
  }

  const onOpen = () => {
    property.open = true
    update()
  }

  const ref = React.useRef()

  return <>
    <div
      {...event}
      {...style}
      ref={el => ref.current = el}
      onClick={property.openType === 'click' ? onOpen : undefined}
      onMouseOver={property.openType === 'mouseover' ? onOpen : undefined}
    >
      {
        children && children.main ? children.main() : null
      }
    </div>
    <Menu open={env && property.open} onClose={onClose} anchorEl={ref.current}>
      {
        property.options.map((i, index) => {
          return <MenuItem key={index} onClick={e => onClick(e, i.value)}>
            {
              i.label
            }
          </MenuItem>
        })
      }
    </Menu>
  </>
}

export default Render