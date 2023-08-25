import React from 'react'

function Render(props) {
  const { event, style, property, monitor, trigger, env, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setSrc) {
      const remove = monitor.setSrc(data => {
        property.src = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <img {...event} {...style} src={property.src} alt={property.alt} />
}

export default Render