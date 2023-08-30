import React from 'react'
import { TextField } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  const onChange = (e) => {
    property.value = e.target.value; update()
    update()
    if (trigger && trigger.onChange) trigger.onChange(e.target.value, e)
  }

  const onFocus = (e) => {
    if (trigger && trigger.onFocus) trigger.onFocus(e.target.value, e)
  }

  const onBlur = (e) => {
    if (trigger && trigger.onBlur) trigger.onBlur(e.target.value, e)
  }

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
    if (monitor && monitor.setValueEmpty) {
      const remove = monitor.setValueEmpty(data => {
        property.value = ''
        update()
      })
      return () => { remove() }
    }
  }, [])

  if (env === 'dev') {
    return <TextField
      {...devParams}
      fullWidth={property.fullWidth}
      type={property.type}
      value={property.value}
      variant={property.variant}
      label={property.label}
      size={property.size}
      color={property.color}
      disabled={property.disabled}
      multiline={property.multiline}
      placeholder={property.placeholder}
    />
  }

  if (env === 'prod') {
    return <TextField
      fullWidth={property.fullWidth}
      type={property.type}
      value={property.value}
      variant={property.variant}
      label={property.label}
      size={property.size}
      color={property.color}
      disabled={property.disabled}
      multiline={property.multiline}
      placeholder={property.placeholder}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  }
}

export default Render