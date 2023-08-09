function Render(props) {
  const React = window.React

  const { compound, property, listen, children, update } = props

  React.useEffect(() => {
    if (listen && listen.setValue) {
      const remove = listen.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <div {...compound}>
    {
      children && children.main ? children.main(property.value) : null
    }
  </div>
}

export default Render