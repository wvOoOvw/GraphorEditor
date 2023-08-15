import React from 'react'

function Render(props) {

  const { property, monitor, trigger, pure } = props

  React.useEffect(() => {
    if (monitor && monitor.setEffect) {
      const remove = monitor.setEffect(data => {
        if (trigger && trigger.onEffect) trigger.onEffect(data)
      })
      return () => { remove() }
    }
  }, [])

  if (!pure) return null

  React.useEffect(() => {
    if (property.immediate) {
      Promise.resolve().then(() => {
        if (trigger && trigger.onEffect) trigger.onEffect()
      })
    }
  }, [])

  return null
}

export default Render