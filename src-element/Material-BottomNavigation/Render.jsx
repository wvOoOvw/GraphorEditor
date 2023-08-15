import React from 'react'

function Render(props) {
  const { BottomNavigation, BottomNavigationAction } = window.MaterialUI

  const { event, property, monitor, trigger, pure, update } = props

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
    if (!pure) return
    property.value = v
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.value, e)
  }
  return <BottomNavigation
    {...event}
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