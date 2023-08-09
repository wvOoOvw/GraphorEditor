function Render(props) {
  const React = window.React
  const { BottomNavigation, BottomNavigationAction } = window.MaterialUI

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
  return <BottomNavigation
    {...compound}
    value={property.value}
    onChange={onChange}
    showLabels
  >
    {
      property.options.map((i, index) => {
        return <BottomNavigationAction key={index} value={i.value} label={i.label}></BottomNavigationAction>
      })
    }
  </BottomNavigation>
}

export default Render