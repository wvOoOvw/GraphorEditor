import React from 'react'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element } = props

  React.useEffect(() => {
    if (monitor && monitor.setValue) {
      const remove = monitor.setValue(data => {
        property.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <div {...params}>
    {
      env && property.value.map((i) => children && children.main ? children.main(i) : null)
    }
    {
      !env && children && children.main ? children.main(property.value) : null
    }
  </div>
}

export default Render