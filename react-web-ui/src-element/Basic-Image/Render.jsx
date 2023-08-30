import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  React.useEffect(() => {
    if (monitor && monitor.setSrc) {
      const remove = monitor.setSrc(data => {
        property.src = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  if (env === 'dev') {
    return <img {...devParams} style={{ ...style.main }} src={property.src} alt={property.alt} />
  }

  if (env === 'prod') {
    return <img style={{ ...style.main }} src={property.src} alt={property.alt} />
  }

}

export default Render