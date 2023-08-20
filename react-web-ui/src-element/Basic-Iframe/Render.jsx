import React from 'react'

function Render(props) {
  const { event, style, property, monitor, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setSrc) {
      const remove = monitor.setSrc(data => {
        property.src = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <iframe {...event} {...style} {...style} src={property.src} />
}

export default Render