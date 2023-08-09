function Render(props) {
  const React = window.React

  const { compound, property, listen, children, pure, update } = props

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
    const e = () => update()
    window.addEventListener('hashchange', e)
    return () => window.removeEventListener('hashchange', e)
  }, [])

  const render_ = () => {
    if (pure) {
      if (property.type === 'none') {
        return children && children.main ? children.main() : null
      }
      if (property.type === 'equal' && window.location.hash === property.value) {
        return children && children.main ? children.main() : null
      }
      if (property.type === 'start' && window.location.hash.startsWith(property.value)) {
        return children && children.main ? children.main() : null
      }
      if (property.type === 'includes' && window.location.hash.includes(property.value)) {
        return children && children.main ? children.main() : null
      }
      return null
    } else {
      return children && children.main ? children.main() : null
    }
  }

  return <div {...compound}>
    {
      render_()
    }
  </div>
}

export default Render