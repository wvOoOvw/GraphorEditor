function Render(props) {
  const React = window.React
  const { Switch } = window.MaterialUI

  const { compound, inner, listen, dispatch, pure, update } = props

  React.useEffect(() => {
    if (listen && listen.setCheckedOpen) {
      const remove = listen.setCheckedOpen(data => {
        inner.checked = true
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setCheckedClose) {
      const remove = listen.setCheckedClose(data => {
        inner.checked = false
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e) => {
    if (!pure) return
    inner.checked = e.target.checked
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(e.target.checked, e)
  }

  return <Switch
    {...compound}
    checked={inner.checked}
    onChange={onChange}
    size={inner.size}
    color={inner.color}
    disabled={inner.disabled}
  />
}

export default Render