function Render(props) {
  const React = window.React
  const { ToggleButtonGroup, ToggleButton } = window.MaterialUI

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
    inner.value = v
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(inner.value, e)
  }

  const style = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return <ToggleButtonGroup {...compound} fullWidth={inner.fullWidth} size={inner.size} color={inner.color} orientation={inner.orientation} exclusive={inner.exclusive} disabled={inner.disabled} value={inner.value} onChange={onChange}>
    {
      inner.options.map((i, index) => {
        return <ToggleButton key={index} value={i.value}>{i.label}</ToggleButton>
      })
    }
  </ToggleButtonGroup>
}

export default Render