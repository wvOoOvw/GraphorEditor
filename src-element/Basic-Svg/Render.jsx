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

  const ref = React.useRef()

  React.useEffect(() => {
    ref.current.innerHTML = inner.value
  }, [inner.value])

  return <svg {...compound} ref={el => ref.current = el}></svg>
}

export default Render