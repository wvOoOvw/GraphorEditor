import React from 'react'

function Render(props) {
  const { Radio } = window.MaterialUI

  const { event, property, monitor, trigger, pure, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setCheckedOpen) {
      const remove = monitor.setCheckedOpen(data => {
        property.checked = true
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (monitor && monitor.setCheckedClose) {
      const remove = monitor.setCheckedClose(data => {
        property.checked = false
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e) => {
    if (!pure) return
    property.checked = true
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.checked, e)
  }

  return <Radio
    {...event}
    checked={property.checked}
    onChange={onChange}
    size={property.size}
    color={property.color}
    disabled={property.disabled}
  />
}

export default Render