function Render(props) {
  const React = window.React

  const { property, listen, dispatch, pure } = props

  React.useEffect(() => {
    if (listen && listen.setEffect) {
      const remove = listen.setEffect(data => {
        if (dispatch && dispatch.onEffect) dispatch.onEffect(data)
      })
      return () => { remove() }
    }
  }, [])

  if (!pure) return null

  React.useEffect(() => {
    if (property.immediate) {
      Promise.resolve().then(() => {
        if (dispatch && dispatch.onEffect) dispatch.onEffect()
      })
    }
  }, [])

  return null
}

export default Render