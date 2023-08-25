import React from 'react'
import { Checkbox } from '@mui/material'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element } = props

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
    if (env === 'dev') return
    property.checked = e.target.checked
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.checked, e)
  }

  return <Checkbox {...params} checked={property.checked} onChange={onChange} size={property.size} color={property.color} disabled={property.disabled} />
}

export default Render