import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  if (env === 'dev') return null

  React.useEffect(() => {
    if (monitor && monitor.triggerDispatch) {
      const remove = monitor.triggerDispatch(data => {
        if (trigger && trigger.triggerEvent) trigger.Dispatch(data)
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (property.immediateDispatch) {
      requestAnimationFrame(() => {
        if (trigger && trigger.Dispatch) trigger.Dispatch()
      })
    }
  }, [])

  return null
}

export default Render