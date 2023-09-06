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
    return <div {...devParams} {...children.content.devParams} style={{ ...style.content }}>
      {
        children.content()
      }
    </div>
  }

  if (env === 'prod') {
    return <div style={{ ...style.main }}>
      {
        property.value.map((i) => children.content(i))
      }
    </div>
  }
}

export default Render