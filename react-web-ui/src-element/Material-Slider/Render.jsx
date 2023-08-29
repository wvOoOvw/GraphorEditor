import React from 'react'
import { Slider } from '@mui/material'

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

  const onChange = (e, v) => {
    property.value = v
    update()
    if (trigger && trigger.onChange) trigger.onChange(v, e)
  }

  if (env === 'dev') {
    return <Slider
      {...params}
      value={Number(property.value)}
      min={Number(property.min)}
      max={Number(property.max)}
      step={Number(property.step)}
      size={property.size}
      color={property.color}
      disabled={property.disabled}
      valueLabelDisplay={property.valueLabelDisplay}
    />
  }

  if (env === 'prod') {
    return <Slider
      {...params}
      value={Number(property.value)}
      onChange={onChange}
      min={Number(property.min)}
      max={Number(property.max)}
      step={Number(property.step)}
      size={property.size}
      color={property.color}
      disabled={property.disabled}
      valueLabelDisplay={property.valueLabelDisplay}
    />
  }


}

export default Render