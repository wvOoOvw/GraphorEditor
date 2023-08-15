import React from 'react'

function Render(props) {
  const { Radio, FormControl, RadioGroup, FormControlLabel } = window.MaterialUI

  const { event, property, monitor, trigger, env, update } = props

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

  const onChange = (e) => {
    if (env === 'dev') return
    property.value = e.target.value
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.value, e)
  }

  return <RadioGroup
    {...event}
    {...style}
    value={property.value}
    onChange={onChange}
  >
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

export default Render