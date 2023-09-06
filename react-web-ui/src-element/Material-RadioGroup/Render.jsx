import React from 'react'
import { Radio, FormControl, RadioGroup, FormControlLabel } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  const onChange = (e) => {
    property.value = e.target.value
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.value, e)
  }

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
        property.value = data
        update()
        if (trigger && trigger.onChange) trigger.onChange(property.value, e)
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

  if (env === 'dev') {
    return <RadioGroup {...devParams} value={property.value}>
      {
        property.options.map((i, index) => {
          return <FormControlLabel
            key={index}
            label={i.label}
            value={i.value}
            control={
              <Radio size={property.size} color={property.color} disabled={property.disabled} />
            }
          />
        })
      }
    </RadioGroup>
  }

  if (env === 'prod') {
    return <RadioGroup value={property.value} onChange={onChange}>
      {
        property.options.map((i, index) => {
          return <FormControlLabel
            key={index}
            label={i.label}
            value={i.value}
            control={
              <Radio size={property.size} color={property.color} disabled={property.disabled} />
            }
          />
        })
      }
    </RadioGroup>
  }
}

export default Render