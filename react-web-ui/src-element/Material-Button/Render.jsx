import React from 'react'
import { Button } from '@mui/material'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

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

  return <Button {...params} disabled={property.disabled} variant={property.variant} fullWidth={property.fullWidth} href={property.href} color={property.color} sx={property.sx}>
    {property.value}
  </Button>
}

export default Render