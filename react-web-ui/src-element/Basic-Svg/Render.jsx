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

  const ref = React.useRef()

  React.useEffect(() => {
    ref.current.innerHTML = property.value
  }, [property.value])

  return <svg {...params} ref={el => ref.current = el}></svg>
}

export default Render