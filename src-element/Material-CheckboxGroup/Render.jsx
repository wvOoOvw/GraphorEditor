function Render(props) {
  const React = window.React
  const { Checkbox, FormControl, FormGroup, FormControlLabel } = window.MaterialUI

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
    if (listen && listen.setOptions) {
      const remove = listen.setOptions(data => {
        property.options = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e, value) => {
    if (!pure) return
    if (property.value.includes(value)) {
      property.value = property.value.filter(i => i !== value)
      update()
      if (dispatch && dispatch.onChange) dispatch.onChange(property.value, e)
    } else {
      property.value.push(value)
      update()
      if (dispatch && dispatch.onChange) dispatch.onChange(property.value, e)
    }
  }

  return <FormGroup {...compound}>
    {
      property.options.map((i, index) => {
        return <FormControlLabel
          key={index}
          label={i.label}
          control={
            <Checkbox
              checked={property.value.includes(i.value)}
              onChange={(e) => onChange(e, i.value)}
              size={property.size}
              color={property.color}
              disabled={property.disabled}
            />
          }
        />
      })
    }
  </FormGroup>
}

export default Render