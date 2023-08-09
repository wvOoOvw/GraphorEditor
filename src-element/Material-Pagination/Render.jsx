function Render(props) {
  const React = window.React
  const { Pagination } = window.MaterialUI

  const { compound, property, listen, dispatch, pure, update } = props

  React.useEffect(() => {
    if (listen && listen.setPage) {
      const remove = listen.setPage(data => {
        property.page = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setCount) {
      const remove = listen.setCount(data => {
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
    if (dispatch && dispatch.onChange) dispatch.onChange(property.page, e)
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