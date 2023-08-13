function Render(props) {
  const React = window.React

  const { compound, property, monitor, pure, update } = props

  const ref = React.useRef()

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (!pure || !property.value) return
    const script = document.createElement('script')
    script.src = property.value
    document.getElementsByTagName('head')[0].appendChild(script)
  }, [property.value])

  return <div {...compound} id={property.id} ref={el => ref.current = el}></div>
}

export default Render