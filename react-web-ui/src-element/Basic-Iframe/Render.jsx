import React from 'react'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element } = props

  React.useEffect(() => {
    if (monitor && monitor.setSrc) {
      const remove = monitor.setSrc(data => {
        property.src = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <iframe {...params} {...style} src={property.src} />
}

export default Render