function Render(props) {
  const React = window.React

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

  const ref = React.useRef()

  React.useEffect(() => {
    ref.current.innerHTML = property.value
  }, [property.value])

  return <svg {...compound} ref={el => ref.current = el}></svg>
}

export default Render