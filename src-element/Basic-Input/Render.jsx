function Render(props) {
  const React = window.React

  const { compound, property, listen, dispatch, update } = props

  React.useEffect(() => {
    if (listen && listen.setValue) {
      const remove = listen.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setValueEmpty) {
      const remove = listen.setValueEmpty(data => {
        property.value = ''
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e) => {
    property.value = e.target.value
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(property.value, e)
  }
  const onFocus = (e) => {
    if (dispatch && dispatch.onFocus) dispatch.onFocus(property.value, e)
  }
  const onBlur = (e) => {
    if (dispatch && dispatch.onBlur) dispatch.onBlur(property.value, e)
  }


  if (property.type === 'textarea') {
    compound.style.resize = 'none'

    return <textarea
      {...compound}
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
      {...compound}
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
    {...compound}
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