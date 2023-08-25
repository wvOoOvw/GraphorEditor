import React from 'react'

function Render(props) {
  const { event, style, property, monitor, trigger, env, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const ref = React.useRef()

  React.useEffect(() => {
    ref.current.innerHTML = property.value
  }, [property.value])

  return <svg {...event} {...style} ref={el => ref.current = el}></svg>
}

export default Render