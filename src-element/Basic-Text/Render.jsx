import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  React.useEffect(() => {
    if (monitor && monitor.setText) {
      const remove = monitor.setText(data => {
        property.text = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  if (env === 'dev') {
    return <span {...devParams} style={{ ...style.content }} >{property.text}</span>
  }

  if (env === 'prod') {
    return <span style={{ ...style.content }} >{property.text}</span>
  }

}

export default Render