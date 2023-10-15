import React from 'react'
import { Button } from '@mui/material'

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
    if (monitor && monitor.enabledButton) {
      const remove = monitor.enabledButton(data => {
        property.disabled = true
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.disabledButton) {
      const remove = monitor.disabledButton(data => {
        property.disabled = false
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onClick = (e) => {
    if (trigger && trigger.onClick) trigger.onClick(undefined, e)
  }

  if (env === 'dev') {
    return <Button {...devParams} disabled={property.disabled} variant={property.variant} fullWidth={property.fullWidth} href={property.href} color={property.color}>
      {property.value}
    </Button>
  }

  if (env === 'prod') {
    return <Button disabled={property.disabled} variant={property.variant} fullWidth={property.fullWidth} href={property.href} color={property.color} onClick={onClick}>
      {property.value}
    </Button>
  }
}

export default Render