import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  const onClick = () => {
    if (property.target === '_self') {
      window.location.href = property.href
    }
    if (property.target === '_blank') {
      window.open(property.href)
    }
  }

  React.useEffect(() => {
    if (monitor && monitor.setHref) {
      const remove = monitor.setHref(data => {
        property.href = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  if (env === 'dev') {
    return <a {...devParams} {...children.content.devParams} style={{ ...style.content }}>
      {
        children.content(prop)
      }
    </a>
  }

  if (env === 'prod') {
    if (property.useDom === true) {
      return <a style={{ ...style.content }} href={property.href} target={property.target}>
        {
          children.content(prop)
        }
      </a>
    }

    if (property.useDom === false) {
      return <span style={{ ...style.content }} onClick={onClick}>
        {
          children.content(prop)
        }
      </span>
    }
  }
}

export default Render