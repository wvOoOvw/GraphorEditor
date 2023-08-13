function Render(props) {
  const React = window.React

  const { compound, property, monitor, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
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