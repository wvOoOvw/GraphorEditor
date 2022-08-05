function Render(props) {
  const React = window.React
  const { Badge } = window.MaterialUI

  const { compound, inner, listen, children, update } = props

  React.useEffect(() => {
    if (listen && listen.setContent) {
      const remove = listen.setContent(data => {
        inner.content = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <Badge {...compound} badgeContent={Number(inner.content)} max={99999} color={inner.color} variant={inner.variant} anchorOrigin={inner.anchorOrigin}>
    {
      children && children.main ? children.main() : null
    }
  </Badge>
}

export default Render