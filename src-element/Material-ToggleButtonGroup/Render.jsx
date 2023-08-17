import React from 'react'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'

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

  return <ToggleButtonGroup {...event} {...style} fullWidth={property.fullWidth} size={property.size} color={property.color} orientation={property.orientation} exclusive={property.exclusive} disabled={property.disabled} value={property.value} onChange={onChange}>
    {
      property.options.map((i, index) => {
        return <ToggleButton key={index} value={i.value}>{i.label}</ToggleButton>
      })
    }
  </ToggleButtonGroup>
}

export default Render