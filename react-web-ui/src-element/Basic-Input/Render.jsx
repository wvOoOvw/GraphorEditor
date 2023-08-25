import React from 'react'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element } = props

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
    property.value = e.target.value
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.value, e)
  }

  const onFocus = (e) => {
    if (env === 'dev') return
    if (trigger && trigger.onFocus) trigger.onFocus(property.value, e)
  }

  const onBlur = (e) => {
    if (env === 'dev') return
    if (trigger && trigger.onBlur) trigger.onBlur(property.value, e)
  }

  if (property.type === 'textarea') {
    style.resize = 'none'

    return <textarea
      {...params}
      value={property.value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={property.placeholder}
      disabled={property.disabled}
    />
  }

  if (property.type === 'file') {
    return <input
      {...params}
      value={property.value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      type={property.type}
      placeholder={property.placeholder}
      disabled={property.disabled}
      multiple={property.fileMultiple}
      accept={property.fileAccept}
    />
  }

  return <input
    {...params}
    value={property.value}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    type={property.type}
    placeholder={property.placeholder}
    disabled={property.disabled}
  />
}

export default Render