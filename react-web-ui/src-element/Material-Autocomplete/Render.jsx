import React from 'react'
import { Autocomplete, TextField } from '@mui/material'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

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
    property.value = v
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.value, e)
  }

  if (env === 'dev') {
    const ref = React.useRef()

    React.useEffect(() => {
      if (ref.current) {
        ref.current.addEventListener('click', e => { params.onClick(e) }, true)
        ref.current.setAttribute('id', params.id)
      }
    }, [])

    return <Autocomplete
      {...params}
      id=''
      multiple={property.multiple}
      size={property.size}
      fullWidth={property.fullWidth}
      disabled={property.disabled}
      options={property.options}
      value={property.value}
      componentsProps={{ popper: { open: false } }}
      renderInput={(params) => <TextField {...params} label={property.label} variant={property.variant} />}
      ref={el => ref.current = el}
    />
  }

  if (env === 'prod') {
    return <Autocomplete
      {...params}
      multiple={property.multiple}
      size={property.size}
      fullWidth={property.fullWidth}
      disabled={property.disabled}
      options={property.options}
      value={property.value}
      onChange={onChange}
      renderInput={(params) => <TextField {...params} label={property.label} variant={property.variant} />}
    />
  }
}

export default Render