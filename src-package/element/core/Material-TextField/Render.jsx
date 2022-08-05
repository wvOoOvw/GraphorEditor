function Render(props) {
  const React = window.React
  const { TextField } = window.MaterialUI

  const { compound, inner, listen, dispatch, pure, update } = props

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
    if (!pure) return
    inner.value = e.target.value
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(e.target.value, e)
  }
  const onFocus = (e) => {
    if (dispatch && dispatch.onFocus) dispatch.onFocus(e.target.value, e)
  }
  const onBlur = (e) => {
    if (dispatch && dispatch.onBlur) dispatch.onBlur(e.target.value, e)
  }

  return <TextField
    {...compound}
    fullWidth
    type={inner.type}
    value={inner.value}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    variant={inner.variant}
    label={inner.label}
    size={inner.size}
    color={inner.color}
    disabled={inner.disabled}
  />
}

export default Render