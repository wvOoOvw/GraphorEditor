import React from 'react'

function Render(props) {

  const { event, property, monitor, children, pure, update } = props

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
      pure && property.value.map((i) => children && children.main ? children.main(i) : null)
    }
    {
      !pure && children && children.main ? children.main(property.value) : null
    }
  </div>
}

export default Render