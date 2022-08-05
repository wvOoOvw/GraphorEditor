function Render(props) {
  const React = window.React
  const { BottomNavigation, BottomNavigationAction } = window.MaterialUI

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
  return <BottomNavigation
    {...compound}
    value={inner.value}
    onChange={onChange}
    showLabels
  >
    {
      inner.options.map((i, index) => {
        return <BottomNavigationAction key={index} value={i.value} label={i.label}></BottomNavigationAction>
      })
    }
  </BottomNavigation>
}

export default Render