import React from 'react'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

  const inRouter = () => {
    if (property.type === 'equal' && window.location.hash === property.value) return true
    if (property.type === 'start' && window.location.hash.startsWith(property.value)) return true
    if (property.type === 'includes' && window.location.hash.includes(property.value)) return true
  }

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (env === 'prod') {
      const event = () => {
        update()
      }
      window.addEventListener('hashchange', event)
      return () => window.removeEventListener('hashchange', event)
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
        inRouter() ?
          (
            children && children.main ? children.main() : null
          )
          : null
      }
    </div>
  }
}

export default Render