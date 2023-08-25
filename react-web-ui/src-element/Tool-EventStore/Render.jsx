import React from 'react'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

  if (env === 'dev') return null

  React.useEffect(() => {
    if (monitor && monitor.monitorEvent) {
      const remove = monitor.monitorEvent(data => {
        if (trigger && trigger.triggerEvent) trigger.triggerEvent(data)
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (property.immediate) {
      requestAnimationFrame(() => {
        if (trigger && trigger.triggerEvent) trigger.triggerEvent()
      })
    }
  }, [])

  return null
}

export default Render