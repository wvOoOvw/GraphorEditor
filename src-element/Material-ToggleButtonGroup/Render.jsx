function Render(props) {
  const React = window.React
  const { ToggleButtonGroup, ToggleButton } = window.MaterialUI

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

  const onChange = (e, v) => {
    if (!pure) return
    property.value = v
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(property.value, e)
  }

  const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return <ToggleButtonGroup {...compound} fullWidth={property.fullWidth} size={property.size} color={property.color} orientation={property.orientation} exclusive={property.exclusive} disabled={property.disabled} value={property.value} onChange={onChange}>
    {
      property.options.map((i, index) => {
        return <ToggleButton key={index} value={i.value}>{i.label}</ToggleButton>
      })
    }
  </ToggleButtonGroup>
}

export default Render