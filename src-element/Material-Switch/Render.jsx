import React from 'react'

function Render(props) {
  const { Switch } = window.MaterialUI

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
    property.checked = e.target.checked
    update()
    if (trigger && trigger.onChange) trigger.onChange(e.target.checked, e)
  }

  return <Switch
    {...event}
    checked={property.checked}
    onChange={onChange}
    size={property.size}
    color={property.color}
    disabled={property.disabled}
  />
}

export default Render