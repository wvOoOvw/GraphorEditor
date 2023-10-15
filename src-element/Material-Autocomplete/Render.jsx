import React from 'react'
import { Autocomplete, TextField } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

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
        ref.current.addEventListener('click', e => { devParams.onClick(e) }, true)
        ref.current.setAttribute('id', devParams.id)
      }
    }, [])

    return <Autocomplete
      {...devParams}
      id=''
      multiple={property.multiple}
      size={property.size}
      fullWidth={property.fullWidth}
      disabled={property.disabled}
      options={property.options}
      value={property.value}
      componentsProps={{ popper: { open: false } }}
      renderInput={(devParams) => <TextField {...devParams} label={property.label} variant={property.variant} />}
      sx={{ '&.MuiFormControl-root': style.formControl, '& .MuiInputBase-root': style.inputRoot, '& input': style.input }}
      ref={el => ref.current = el}
    />
  }

  if (env === 'prod') {
    return <Autocomplete
      multiple={property.multiple}
      size={property.size}
      fullWidth={property.fullWidth}
      disabled={property.disabled}
      options={property.options}
      value={property.value}
      onChange={onChange}
      renderInput={(devParams) => <TextField {...devParams} label={property.label} variant={property.variant} />}
      sx={{ '&.MuiFormControl-root': style.formControl, '& .MuiInputBase-root': style.inputRoot, '& input': style.input }}
    />
  }
}

export default Render