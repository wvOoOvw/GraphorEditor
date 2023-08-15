import React from 'react'

function Render(props) {
  const { Slider } = window.MaterialUI

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

  const onChange = (e, v) => {
    if (!pure) return
    property.value = v
    update()
    if (trigger && trigger.onChange) trigger.onChange(v, e)
  }

  return <Slider
    {...event}
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

export default Render