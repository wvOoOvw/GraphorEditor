import React from 'react'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

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
    return <span {...params}>Iframe</span>
  }

  if (env === 'prod') {
    return <iframe {...params} src={property.src} />
  }

}

export default Render