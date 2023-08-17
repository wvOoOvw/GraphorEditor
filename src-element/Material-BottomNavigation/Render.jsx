import React from 'react'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'

function Render(props) {
  const { event, style, property, monitor, trigger, env, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (monitor && monitor.setOptions) {
      const remove = monitor.setOptions(data => {
        property.options = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e, v) => {
    if (env === 'dev') return
    property.value = v
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.value, e)
  }
  return <BottomNavigation
    {...event}
    {...style}
    value={property.value}
    onChange={onChange}
    showLabels
  >
    {
      property.options.map((i, index) => {
        return <BottomNavigationAction key={index} value={i.value} label={i.label}></BottomNavigationAction>
      })
    }
  </BottomNavigation>
}

export default Render