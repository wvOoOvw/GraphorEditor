import React from 'react'

function Render(props) {
  const { event, style, property, monitor, trigger, env, update } = props

  React.useEffect(() => {
    if (monitor && monitor.monitorEvent) {
      const remove = monitor.monitorEvent(data => {
        if (trigger && trigger.triggerEvent) trigger.triggerEvent(data)
      })
      return () => { remove() }
    }
  }, [])

  if (env === 'dev') return null

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