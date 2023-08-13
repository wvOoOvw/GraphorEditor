function Render(props) {
  const React = window.React

  const { compound, property, monitor, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setSrc) {
      const remove = monitor.setSrc(data => {
        property.src = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <img {...compound} src={property.src} alt={property.alt} />
}

export default Render