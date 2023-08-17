import React from 'react'
import { Checkbox, FormControl, FormGroup, FormControlLabel } from '@mui/material'

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

  const onChange = (e, value) => {
    if (env === 'dev') return
    if (property.value.includes(value)) {
      property.value = property.value.filter(i => i !== value)
      update()
      if (trigger && trigger.onChange) trigger.onChange(property.value, e)
    } else {
      property.value.push(value)
      update()
      if (trigger && trigger.onChange) trigger.onChange(property.value, e)
    }
  }

  return <FormGroup {...event}>
    {
      property.options.map((i, index) => {
        return <FormControlLabel
          key={index}
          label={i.label}
          control={
            <Checkbox
              checked={property.value.includes(i.value)}
              onChange={(e) => onChange(e, i.value)}
              size={property.size}
              color={property.color}
              disabled={property.disabled}
            />
          }
        />
      })
    }
  </FormGroup>
}

export default Render