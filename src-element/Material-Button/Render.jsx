import React from 'react'

function Render(props) {
  const { Button } = window.MaterialUI

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
  React.useEffect(() => {
    if (monitor && monitor.setDisabledOpen) {
      const remove = monitor.setDisabledOpen(data => {
        property.disabled = true
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (monitor && monitor.setDisabledClose) {
      const remove = monitor.setDisabledClose(data => {
        property.disabled = false
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <Button
    {...event}
    disabled={property.disabled}
    variant={property.variant}
    color={property.color}
    component='div'
  >
    {property.value}
  </Button>
}

export default Render