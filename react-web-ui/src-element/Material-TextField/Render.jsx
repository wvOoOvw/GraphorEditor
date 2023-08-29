import React from 'react'
import { TextField } from '@mui/material'

function Render(props) {

  const { env, update, params, property, monitor, trigger, children, element, prop } = props

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

  const onChange = (e) => {
    if (env === 'dev') return
    property.value  = e.target.value; update()
    update()
    if (trigger && trigger.onChange) trigger.onChange(e.target.value, e)
  }
  const onFocus = (e) => {
    if (trigger && trigger.onFocus) trigger.onFocus(e.target.value, e)
  }
  const onBlur = (e) => {
    if (trigger && trigger.onBlur) trigger.onBlur(e.target.value, e)
  }

  return <TextField
    {...params}
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
    sx={property.sx}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
  />
}

export default Render