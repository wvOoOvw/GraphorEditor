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

  React.useEffect(() => {
    const e = () => update()
    window.addEventListener('hashchange', e)
    return () => window.removeEventListener('hashchange', e)
  }, [])

  const render_ = () => {
    if (pure) {
      if (inner.type === 'none') {
        return children && children.main ? children.main() : null
      }
      if (inner.type === 'equal' && window.location.hash === inner.value) {
        return children && children.main ? children.main() : null
      }
      if (inner.type === 'start' && window.location.hash.startsWith(inner.value)) {
        return children && children.main ? children.main() : null
      }
      if (inner.type === 'includes' && window.location.hash.includes(inner.value)) {
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