import React from 'react'
import { Switch } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

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
    property.checked = e.target.checked
    update()
    if (trigger && trigger.onChange) trigger.onChange(e.target.checked, e)
  }

  if (env === 'dev') {
    return <Switch
      {...devParams}
      checked={property.checked}
      size={property.size}
      color={property.color}
      disabled={property.disabled}
    />
  }

  if (env === 'prod') {
    return <Switch
      {...devParams}
      checked={property.checked}
      onChange={onChange}
      size={property.size}
      color={property.color}
      disabled={property.disabled}
    />
  }
}

export default Render