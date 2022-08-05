function Render(props) {
  const React = window.React
  const { InputLabel, MenuItem, FormControl, Select } = window.MaterialUI

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
    if (listen && listen.setOptions) {
      const remove = listen.setOptions(data => {
        inner.options = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e) => {
    if (!pure) return
    inner.value = e.target.value
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(inner.value, e)
  }

  const Render = <FormControl {...compound} size={inner.size}>
    <InputLabel>{inner.label}</InputLabel>
    <Select multiple={inner.multiple} label={inner.label} variant={inner.variant} disabled={inner.disabled} value={inner.value} onChange={onChange}>
      {
        inner.options.map((i, index) => {
          return <MenuItem key={index} value={i.value}>{i.label}</MenuItem>
        })
      }
    </Select>
  </FormControl>

  if (pure) {
    return Render
  } else {
    const ref = React.useRef()
    React.useEffect(() => {
      if (ref.current) ref.current.addEventListener('mousedown', e => { e.stopPropagation(); e.preventDefault() }, true)
    }, [])
    return <div ref={el => ref.current = el}>{Render}</div>
  }
}

export default Render