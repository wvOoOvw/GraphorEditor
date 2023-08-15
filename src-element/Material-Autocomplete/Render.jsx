import React from 'react'

function Render(props) {
  const { Autocomplete, TextField } = window.MaterialUI

  const { event, property, monitor, trigger, pure, update } = props

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
    if (monitor && monitor.setOptions) {
      const remove = monitor.setOptions(data => {
        property.options = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e, v) => {
    if (!pure) return
    if (v) {
      property.value = Array.isArray(v) ? v.map(i => i.value) : v.value
    } else {
      property.value = ''
    }
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.value, e)
  }

  const getValue = () => {
    if (property.value) {
      return Array.isArray(property.value) ? property.value.map(i => property.options.find(i_ => i_.value === i)) : property.options.find(i => i.value === property.value)
    } else {
      return null
    }
  }

  const Render = <Autocomplete
    {...event}
    multiple={property.multiple}
    size={property.size}
    options={property.options}
    getOptionLabel={(option) => option.label}
    value={getValue()}
    onChange={onChange}
    renderInput={(params) => <TextField {...params} label={property.label} variant={property.variant} />}
  />

  if (pure) {
    return Render
  } else {
    const ref = React.useRef()
    React.useEffect(() => {
      if (ref.current) {
        ref.current.addEventListener('mousedown', e => { event.onMouseDown(e) }, true)
        ref.current.addEventListener('mouseup', e => { event.onMouseUp(e) }, true)
        ref.current.addEventListener('click', e => { event.onClick(e) }, true)
      }
    }, [])
    return <div ref={el => ref.current = el}>{Render}</div>
  }
}

export default Render