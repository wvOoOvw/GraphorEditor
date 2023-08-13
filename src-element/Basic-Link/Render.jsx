function Render(props) {
  const React = window.React

  const { compound, property, monitor, children, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setHref) {
      const remove = monitor.setHref(data => {
        property.href = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onClick = () => {
    if (!compound.onClick) compound.onClick()
    if (property.target === '_self') {
      window.location.href = property.href
    }
    if (property.target === '_blank') {
      window.open(property.href)
    }
  }

  if (property.useDom) {
    return <a {...compound} href={property.href} target={property.target}>
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