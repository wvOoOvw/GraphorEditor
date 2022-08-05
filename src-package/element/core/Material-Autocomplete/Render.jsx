function Render(props) {
  const React = window.React
  const { Autocomplete, TextField } = window.MaterialUI

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

  const onChange = (e, v) => {
    if (!pure) return
    if (v) {
      inner.value = Array.isArray(v) ? v.map(i => i.value) : v.value
    } else {
      inner.value = ''
    }
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(inner.value, e)
  }

  const getValue = () => {
    if (inner.value) {
      return Array.isArray(inner.value) ? inner.value.map(i => inner.options.find(i_ => i_.value === i)) : inner.options.find(i => i.value === inner.value)
    } else {
      return null
    }
  }

  const Render = <Autocomplete
    {...compound}
    multiple={inner.multiple}
    size={inner.size}
    options={inner.options}
    getOptionLabel={(option) => option.label}
    value={getValue()}
    onChange={onChange}
    renderInput={(params) => <TextField {...params} label={inner.label} variant={inner.variant} />}
  />

  if (pure) {
    return Render
  } else {
    const ref = React.useRef()
    React.useEffect(() => {
      if (ref.current) {
        ref.current.addEventListener('mousedown', e => { compound.onMouseDown(e) }, true)
        ref.current.addEventListener('mouseup', e => { compound.onMouseUp(e) }, true)
        ref.current.addEventListener('click', e => { compound.onClick(e) }, true)
      }
    }, [])
    return <div ref={el => ref.current = el}>{Render}</div>
  }
}

export default Render