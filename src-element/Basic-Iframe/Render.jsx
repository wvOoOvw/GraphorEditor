function Render(props) {
  const React = window.React

  const { compound, property, listen, update } = props

  React.useEffect(() => {
    if (listen && listen.setSrc) {
      const remove = listen.setSrc(data => {
        property.src = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <iframe {...compound} src={property.src} />
}

export default Render