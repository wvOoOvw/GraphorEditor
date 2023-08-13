function Render(props) {
  const React = window.React
  const { Pagination } = window.MaterialUI

  const { compound, property, monitor, trigger, pure, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setPage) {
      const remove = monitor.setPage(data => {
        property.page = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (monitor && monitor.setCount) {
      const remove = monitor.setCount(data => {
        property.count = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e, v) => {
    if (!pure) return
    property.page = v
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.page, e)
  }

  return <Pagination
    {...compound}
    count={Number(property.count)}
    page={Number(property.page)}
    onChange={onChange}
    size={property.size}
    color={property.color}
    shape={property.shape}
    variant={property.variant}
  />
}

export default Render