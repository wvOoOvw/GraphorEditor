function Render(props) {
  const React = window.React
  const { Radio, FormControl, RadioGroup, FormControlLabel } = window.MaterialUI

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

  const onChange = (e) => {
    if (!pure) return
    inner.value = e.target.value
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(inner.value, e)
  }

  return <RadioGroup
    {...compound}
    value={inner.value}
    onChange={onChange}
  >
    {
      inner.options.map((i, index) => {
        return <FormControlLabel
          key={index}
          label={i.label}
          value={i.value}
          control={
            <Radio size={inner.size} color={inner.color} disabled={inner.disabled} />
          }
        />
      })
    }
  </RadioGroup>
}

export default Render