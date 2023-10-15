import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  if (env === 'dev') return null

  const transform = (input) => {
    var output = input

    if (property.transformType === 'key2object') output = { [property.transformValue[0]]: input }
    if (property.transformType === 'object2key') output = input[property.transformValue[0]]

    return output
  }

  React.useEffect(() => {
    if (monitor && monitor.triggerOutput) {
      const remove = monitor.triggerOutput(data => {
        if (trigger && trigger.output) trigger.output(transform(data))
      })
      return () => { remove() }
    }
  }, [])

  return null
}

export default Render