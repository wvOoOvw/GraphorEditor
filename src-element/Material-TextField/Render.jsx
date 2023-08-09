function Render(props) {
  const React = window.React
  const { TextField } = window.MaterialUI

  const { compound, property, listen, dispatch, pure, update } = props

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
    if (!pure) return
    property.value = e.target.value
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
    type={property.type}
    value={property.value}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    variant={property.variant}
    label={property.label}
    size={property.size}
    color={property.color}
    disabled={property.disabled}
  />
}

export default Render