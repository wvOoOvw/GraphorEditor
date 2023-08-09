function Render(props) {
  const React = window.React
  const { Pagination } = window.MaterialUI

  const { compound, inner, listen, dispatch, pure, update } = props

  React.useEffect(() => {
    if (listen && listen.setPage) {
      const remove = listen.setPage(data => {
        inner.page = data
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setCount) {
      const remove = listen.setCount(data => {
        inner.count = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e, v) => {
    if (!pure) return
    inner.page = v
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(inner.page, e)
  }

  return <Pagination
    {...compound}
    count={Number(inner.count)}
    page={Number(inner.page)}
    onChange={onChange}
    size={inner.size}
    color={inner.color}
    shape={inner.shape}
    variant={inner.variant}
  />
}

export default Render