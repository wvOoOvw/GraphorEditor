import React from 'react'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element } = props

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
    if (!event.onClick) event.onClick()
    if (property.target === '_self') {
      window.location.href = property.href
    }
    if (property.target === '_blank') {
      window.open(property.href)
    }
  }

  if (property.useDom === true) {
    return <a {...params} href={property.href} target={property.target}>
      {
        children && children.main ? children.main() : null
      }
    </a>
  }
  
  if (property.useDom === false) {
    return <div {...params} onClick={onClick}>
      {
        children && children.main ? children.main() : null
      }
    </div>
  }
}

export default Render