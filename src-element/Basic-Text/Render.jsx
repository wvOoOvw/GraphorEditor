function Render(props) {
  const React = window.React

  const { compound, inner, listen, update } = props

  React.useEffect(() => {
    if (listen && listen.setValue) {
      const remove = listen.setValue(data => {
        inner.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return React.createElement(inner.dom, { ...compound, children: inner.value })
}

export default Render