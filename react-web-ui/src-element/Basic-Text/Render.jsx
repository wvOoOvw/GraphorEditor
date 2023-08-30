import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  if (env === 'dev') {
    return <span {...devParams} style={{ ...style.main }} >{property.value}</span>
  }

  if (env === 'prod') {
    return <span style={{ ...style.main }} >{property.value}</span>
  }

}

export default Render