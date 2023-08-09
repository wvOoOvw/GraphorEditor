function Render(props) {
  const React = window.React
  const { Slider } = window.MaterialUI

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

  const onChange = (e, v) => {
    if (!pure) return
    property.value = v
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(v, e)
  }

  return <Slider
    {...compound}
    value={Number(property.value)}
    onChange={onChange}
    min={Number(property.min)}
    max={Number(property.max)}
    step={Number(property.step)}
    size={property.size}
    color={property.color}
    disabled={property.disabled}
    valueLabelDisplay={property.valueLabelDisplay}
  />
}

export default Render