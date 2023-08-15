import React from 'react'

function Render(props) {

  const { event, property, monitor, trigger, update } = props

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
    property.value = e.target.value
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.value, e)
  }
  const onFocus = (e) => {
    if (trigger && trigger.onFocus) trigger.onFocus(property.value, e)
  }
  const onBlur = (e) => {
    if (trigger && trigger.onBlur) trigger.onBlur(property.value, e)
  }


  if (property.type === 'textarea') {
    event.style.resize = 'none'

    return <textarea
      {...event}
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
      {...event}
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
    {...event}
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