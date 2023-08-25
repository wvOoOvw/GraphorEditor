import React from 'react'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

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
    return <div {...params}>
      {
        children && children.main ? children.main() : null
      }
    </div>
  }

  if (env === 'prod') {
    return <div {...params}>
      {
        property.value.map((i) => children && children.main ? children.main(i) : null)
      }
    </div>
  }
}

export default Render