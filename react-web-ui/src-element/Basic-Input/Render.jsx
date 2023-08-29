import React from 'react'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

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
    if (property.type === 'textarea') {
      return <textarea {...params} style={{ ...params.style, resize: 'none' }} value={property.value} onFocus={onFocus} onBlur={onBlur} placeholder={property.placeholder} disabled={property.disabled} />
    }

    if (property.type === 'file') {
      return <input {...params} value={property.value} onFocus={onFocus} onBlur={onBlur} type={property.type} placeholder={property.placeholder} disabled={property.disabled} multiple={property.fileMultiple} accept={property.fileAccept} />
    }

    if (property.type !== 'textarea' && property.type !== 'file') {
      return <input {...params} value={property.value} onFocus={onFocus} onBlur={onBlur} type={property.type} placeholder={property.placeholder} disabled={property.disabled} />
    }
  }

  if (env === 'prod') {
    if (property.type === 'textarea') {
      return <textarea {...params} style={{ ...params.style, resize: 'none' }} value={property.value} placeholder={property.placeholder} disabled={property.disabled} />
    }

    if (property.type === 'file') {
      return <input {...params} value={property.value} type={property.type} placeholder={property.placeholder} disabled={property.disabled} multiple={property.fileMultiple} accept={property.fileAccept} />
    }

    if (property.type !== 'textarea' && property.type !== 'file') {
      return <input {...params} value={property.value} type={property.type} placeholder={property.placeholder} disabled={property.disabled} />
    }
  }
}

export default Render