function Render(props) {
  const React = window.React
  const { Radio, FormControl, RadioGroup, FormControlLabel } = window.MaterialUI

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

  const onChange = (e) => {
    if (!pure) return
    property.value = e.target.value
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(property.value, e)
  }

  return <RadioGroup
    {...compound}
    value={property.value}
    onChange={onChange}
  >
    {
      property.options.map((i, index) => {
        return <FormControlLabel
          key={index}
          label={i.label}
          value={i.value}
          control={
            <Radio size={property.size} color={property.color} disabled={property.disabled} />
          }
        />
      })
    }
  </RadioGroup>
}

export default Render