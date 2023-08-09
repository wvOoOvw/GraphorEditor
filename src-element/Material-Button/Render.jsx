function Render(props) {
  const React = window.React
  const { Button } = window.MaterialUI

  const { compound, property, listen, update } = props

  React.useEffect(() => {
    if (listen && listen.setValue) {
      const remove = listen.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setDisabledOpen) {
      const remove = listen.setDisabledOpen(data => {
        property.disabled = true
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setDisabledClose) {
      const remove = listen.setDisabledClose(data => {
        property.disabled = false
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <Button
    {...compound}
    disabled={property.disabled}
    variant={property.variant}
    color={property.color}
    component='div'
  >
    {property.value}
  </Button>
}

export default Render