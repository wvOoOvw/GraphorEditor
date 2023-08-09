function Render(props) {
  const React = window.React

  const { compound, inner, listen, update } = props

  React.useEffect(() => {
    if (listen && listen.setSrc) {
      const remove = listen.setSrc(data => {
        inner.src = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <img {...compound} src={inner.src} alt={inner.alt} />
}

export default Render