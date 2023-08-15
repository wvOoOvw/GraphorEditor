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

  return <div {...event}>
    {
      env && property.value.map((i) => children && children.main ? children.main(i) : null)
    }
    {
      !env && children && children.main ? children.main(property.value) : null
    }
  </div>
}

export default Render