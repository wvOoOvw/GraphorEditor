function Render(props) {
  const React = window.React

  const { inner, listen, dispatch, pure } = props

  const bindWindow = () => {
    if (inner.useWindow && inner.windowName) window[inner.windowName] = inner.value
  }

  React.useEffect(() => {
    if (listen && listen.setValue) {
      const remove = listen.setValue(data => {
        inner.value = data
        bindWindow()
        if (dispatch && dispatch.onEffect) dispatch.onEffect(inner.value)
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (listen && listen.assignValue) {
      const remove = listen.assignValue(data => {
        Object.assign(inner.value, data)
        bindWindow()
        if (dispatch && dispatch.onEffect) dispatch.onEffect(inner.value)
      })
      return () => { remove() }
    }
  }, [])

  if (!pure) return null

  React.useEffect(() => {
    if (inner.immediate) {
      Promise.resolve().then(() => {
        bindWindow()
        if (dispatch && dispatch.onEffect) dispatch.onEffect(inner.value)
      })
    }
  }, [])

  React.useEffect(() => { bindWindow() }, [inner.useWindow, inner.windowName])

  return null
}

export default Render