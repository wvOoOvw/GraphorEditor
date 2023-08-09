function Render(props) {
  const React = window.React

  const { compound, property, listen, update } = props

  React.useEffect(() => {
    if (listen && listen.setValue) {
      const remove = listen.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return React.createElement(property.dom, { ...compound, children: property.value })
}

export default Render