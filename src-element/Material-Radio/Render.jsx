import React from 'react'
import { Radio } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  React.useEffect(() => {
    if (monitor && monitor.checkRadio) {
      const remove = monitor.checkRadio(data => {
        property.checked = true
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.uncheckRadio) {
      const remove = monitor.uncheckRadio(data => {
        property.checked = false
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e) => {
    property.checked = true
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.checked, e)
  }

  if (env === 'dev') {
    return <Radio
      {...devParams}
      checked={property.checked}
      size={property.size}
      color={property.color}
      disabled={property.disabled}
    />
  }

  if (env === 'prod') {
    return <Radio
      checked={property.checked}
      onChange={onChange}
      size={property.size}
      color={property.color}
      disabled={property.disabled}
    />
  }
}

export default Render