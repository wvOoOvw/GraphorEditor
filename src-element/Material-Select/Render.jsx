function Render(props) {
  const React = window.React
  const { InputLabel, MenuItem, FormControl, Select } = window.MaterialUI

  const { compound, property, monitor, trigger, pure, update } = props

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

  const onChange = (e) => {
    if (!pure) return
    property.value = e.target.value
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.value, e)
  }

  const Render = <FormControl {...compound} size={property.size}>
    <InputLabel>{property.label}</InputLabel>
    <Select {...sx.SelectSX} multiple={property.multiple} label={property.label} variant={property.variant} disabled={property.disabled} value={property.value} onChange={onChange}>
      {
        property.options.map((i, index) => {
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