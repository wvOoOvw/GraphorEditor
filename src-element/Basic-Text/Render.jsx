import React from 'react'

function Render(props) {
  const { event, style, property, monitor, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return React.createElement(property.dom, { ...event, children: property.value })
}

export default Render