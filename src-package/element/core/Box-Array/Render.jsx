function Render(props) {
  const React = window.React

  const { compound, inner, listen, children, pure, update } = props

  React.useEffect(() => {
    if (listen && listen.setValue) {
      const remove = listen.setValue(data => {
        inner.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <div {...compound}>
    {
      pure && inner.value.map((i) => children && children.main ? children.main(i) : null)
    }
    {
      !pure && children && children.main ? children.main(inner.value) : null
    }
  </div>
}

export default Render