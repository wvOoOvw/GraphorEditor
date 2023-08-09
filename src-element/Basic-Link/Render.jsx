function Render(props) {
  const React = window.React

  const { compound, inner, listen, children, update } = props

  React.useEffect(() => {
    if (listen && listen.setHref) {
      const remove = listen.setHref(data => {
        inner.href = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onClick = () => {
    if (!compound.onClick) compound.onClick()
    if (inner.target === '_self') {
      window.location.href = inner.href
    }
    if (inner.target === '_blank') {
      window.open(inner.href)
    }
  }

  if (inner.useDom) {
    return <a {...compound} href={inner.href} target={inner.target}>
      {
        children && children.main ? children.main() : null
      }
    </a>
  } else {
    return <div {...compound} onClick={onClick}>
      {
        children && children.main ? children.main() : null
      }
    </div>
  }
}

export default Render