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
    return <div {...devParams} style={{ ...style.main }}>
      {
        children && children.main ? children.main() : null
      }
    </div>
  }

  if (env === 'prod') {
    return <div style={{ ...style.main }}>
      {
        property.value.map((i) => children && children.main ? children.main(i) : null)
      }
    </div>
  }
}

export default Render