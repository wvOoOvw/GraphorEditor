function Render(props) {
  const React = window.React

  const { compound, property, monitor, children, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
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