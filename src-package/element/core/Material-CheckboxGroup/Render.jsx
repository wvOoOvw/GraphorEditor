function Render(props) {
  const React = window.React
  const { Checkbox, FormControl, FormGroup, FormControlLabel } = window.MaterialUI

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

  const onChange = (e, value) => {
    if (!pure) return
    if (inner.value.includes(value)) {
      inner.value = inner.value.filter(i => i !== value)
      update()
      if (dispatch && dispatch.onChange) dispatch.onChange(inner.value, e)
    } else {
      inner.value.push(value)
      update()
      if (dispatch && dispatch.onChange) dispatch.onChange(inner.value, e)
    }
  }

  return <FormGroup {...compound}>
    {
      inner.options.map((i, index) => {
        return <FormControlLabel
          key={index}
          label={i.label}
          control={
            <Checkbox
              checked={inner.value.includes(i.value)}
              onChange={(e) => onChange(e, i.value)}
              size={inner.size}
              color={inner.color}
              disabled={inner.disabled}
            />
          }
        />
      })
    }
  </FormGroup>
}

export default Render