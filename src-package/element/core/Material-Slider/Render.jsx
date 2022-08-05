function Render(props) {
  const React = window.React
  const { Slider } = window.MaterialUI

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

  const onChange = (e, v) => {
    if (!pure) return
    inner.value = v
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(v, e)
  }

  return <Slider
    {...compound}
    value={Number(inner.value)}
    onChange={onChange}
    min={Number(inner.min)}
    max={Number(inner.max)}
    step={Number(inner.step)}
    size={inner.size}
    color={inner.color}
    disabled={inner.disabled}
    valueLabelDisplay={inner.valueLabelDisplay}
  />
}

export default Render