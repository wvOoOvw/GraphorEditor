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
    return <svg {...devParams} style={{ ...style.main }} dangerouslySetInnerHTML={property.value}></svg>
  }

  if (env === 'prod') {
    return <svg style={{ ...style.main }} dangerouslySetInnerHTML={property.value}></svg>
  }
}

export default Render