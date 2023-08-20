import React from 'react'
import { Autocomplete, TextField } from '@mui/material'

function Render(props) {
  const { event, style, property, monitor, trigger, env, update } = props

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
    if (env === 'dev') return
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

  if (env === 'dev') {
    const ref = React.useRef()

    React.useEffect(() => {
      if (ref.current) {
        ref.current.addEventListener('mousedown', e => { event.onMouseDown(e) }, true)
        ref.current.addEventListener('mouseup', e => { event.onMouseUp(e) }, true)
        ref.current.addEventListener('click', e => { event.onClick(e) }, true)
      }
    }, [])

    return <Autocomplete
      {...event}
      {...style}
      multiple={property.multiple}
      size={property.size}
      fullWidth={property.fullWidth}
      disabled={property.disabled}
      options={property.options}
      value={getValue()}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label={property.label} variant={property.variant} />}
      ref={el => ref.current = el}
    />
  }

  if (env === 'prod') {
    return <Autocomplete
      {...event}
      {...style}
      multiple={property.multiple}
      size={property.size}
      fullWidth={property.fullWidth}
      disabled={property.disabled}
      options={property.options}
      value={getValue()}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label={property.label} variant={property.variant} />}
    />
  }
}

export default Render