import React from 'react'

function Render(props) {
  const { event, property, monitor, children, env, update } = props

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
    const e = () => update()
    window.addEventListener('hashchange', e)
    return () => window.removeEventListener('hashchange', e)
  }, [])

  const render_ = () => {
    if (env === 'prod') {
      if (property.type === 'none') {
        return children && children.main ? children.main() : null
      }
      if (property.type === 'equal' && window.location.hash === property.value) {
        return children && children.main ? children.main() : null
      }
      if (property.type === 'start' && window.location.hash.startsWith(property.value)) {
        return children && children.main ? children.main() : null
      }
      if (property.type === 'includes' && window.location.hash.includes(property.value)) {
        return children && children.main ? children.main() : null
      }
      return null
    } else {
      return children && children.main ? children.main() : null
    }
  }

  return <div {...event}>
    {
      render_()
    }
  </div>
}

export default Render