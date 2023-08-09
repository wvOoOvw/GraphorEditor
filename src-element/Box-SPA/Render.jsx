function Render(props) {
  const React = window.React

  const { compound, inner, listen, pure, update } = props

  const ref = React.useRef()

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
    if (!pure || !inner.value) return
    const script = document.createElement('script')
    script.src = inner.value
    document.getElementsByTagName('head')[0].appendChild(script)
  }, [inner.value])

  return <div {...compound} id={inner.id} ref={el => ref.current = el}></div>
}

export default Render