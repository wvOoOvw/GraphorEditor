function Render(props) {
  const React = window.React
  const { Button } = window.MaterialUI

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
  React.useEffect(() => {
    if (listen && listen.setDisabledOpen) {
      const remove = listen.setDisabledOpen(data => {
        inner.disabled = true
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setDisabledClose) {
      const remove = listen.setDisabledClose(data => {
        inner.disabled = false
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <Button
    {...compound}
    disabled={inner.disabled}
    variant={inner.variant}
    color={inner.color}
    component='div'
  >
    {inner.value}
  </Button>
}

export default Render