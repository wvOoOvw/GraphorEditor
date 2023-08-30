import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  React.useEffect(() => {
    if (monitor && monitor.setSrc) {
      const remove = monitor.setValue(data => {
        property.src = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  if (env === 'dev') {
    return <div {...devParams} style={{ ...style.main }}></div>
  }

  if (env === 'prod') {
    React.useEffect(() => {
      const script = document.createElement('script')
      script.src = property.src
      document.getElementsByTagName('head')[0].appendChild(script)
    }, [property.src])

    return <div style={{ ...style.main }} id={property.id}></div>
  }
}

export default Render