import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  if (env === 'dev') return null

  const bindWindow = () => {
    if (property.useWindow && property.windowName) window[property.windowName] = property.value
  }

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
        property.value = data
        bindWindow()
        if (trigger && trigger.onEffect) trigger.onEffect(property.value)
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.assignValue) {
      const remove = monitor.assignValue(data => {
        Object.assign(property.value, data)
        bindWindow()
        if (trigger && trigger.onEffect) trigger.onEffect(property.value)
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (property.immediate) {
      Promise.resolve().then(() => {
        bindWindow()
        if (trigger && trigger.onEffect) trigger.onEffect(property.value)
      })
    }
  }, [])

  React.useEffect(() => { bindWindow() }, [property.useWindow, property.windowName])

  return null
}

export default Render