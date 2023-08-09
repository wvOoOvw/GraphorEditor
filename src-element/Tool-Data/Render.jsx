function Render(props) {
  const React = window.React

  const { property, listen, dispatch, pure } = props

  const bindWindow = () => {
    if (property.useWindow && property.windowName) window[property.windowName] = property.value
  }

  React.useEffect(() => {
    if (listen && listen.setValue) {
      const remove = listen.setValue(data => {
        property.value = data
        bindWindow()
        if (dispatch && dispatch.onEffect) dispatch.onEffect(property.value)
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (listen && listen.assignValue) {
      const remove = listen.assignValue(data => {
        Object.assign(property.value, data)
        bindWindow()
        if (dispatch && dispatch.onEffect) dispatch.onEffect(property.value)
      })
      return () => { remove() }
    }
  }, [])

  if (!pure) return null

  React.useEffect(() => {
    if (property.immediate) {
      Promise.resolve().then(() => {
        bindWindow()
        if (dispatch && dispatch.onEffect) dispatch.onEffect(property.value)
      })
    }
  }, [])

  React.useEffect(() => { bindWindow() }, [property.useWindow, property.windowName])

  return null
}

export default Render