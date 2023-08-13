function Render(props) {
  const React = window.React

  const { compound, property, monitor, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return React.createElement(property.dom, { ...compound, children: property.value })
}

export default Render