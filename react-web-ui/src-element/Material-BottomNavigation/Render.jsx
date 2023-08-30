import React from 'react'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'

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
    property.value = v
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.value, e)
  }

  if (env === 'dev') {
    return <BottomNavigation {...devParams} value={property.value} showLabels>
      {
        property.options.map((i, index) => {
          return <BottomNavigationAction key={index} value={i.value} label={i.label}></BottomNavigationAction>
        })
      }
    </BottomNavigation>
  }

  if (env === 'prod') {
    return <BottomNavigation value={property.value} onChange={onChange} showLabels>
      {
        property.options.map((i, index) => {
          return <BottomNavigationAction key={index} value={i.value} label={i.label}></BottomNavigationAction>
        })
      }
    </BottomNavigation>
  }
}

export default Render