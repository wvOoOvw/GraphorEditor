function Render(props) {
  const React = window.React

  const { compound, inner, listen, dispatch, update } = props

  React.useEffect(() => {
    if (listen && listen.setValue) {
      const remove = listen.setValue(data => {
        inner.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setValueEmpty) {
      const remove = listen.setValueEmpty(data => {
        inner.value = ''
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e) => {
    inner.value = e.target.value
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(inner.value, e)
  }
  const onFocus = (e) => {
    if (dispatch && dispatch.onFocus) dispatch.onFocus(inner.value, e)
  }
  const onBlur = (e) => {
    if (dispatch && dispatch.onBlur) dispatch.onBlur(inner.value, e)
  }


  if (inner.type === 'textarea') {
    compound.style.resize = 'none'

    return <textarea
      {...compound}
      value={inner.value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={inner.placeholder}
      disabled={inner.disabled}
    />
  }

  if (inner.type === 'file') {
    return <input
      {...compound}
      value={inner.value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      type={inner.type}
      placeholder={inner.placeholder}
      disabled={inner.disabled}
      multiple={inner.fileMultiple}
      accept={inner.fileAccept}
    />
  }

  return <input
    {...compound}
    value={inner.value}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    type={inner.type}
    placeholder={inner.placeholder}
    disabled={inner.disabled}
  />
}

export default Render