function Render(props) {
  const React = window.React
  const { Menu, MenuItem } = window.MaterialUI

  const { compound, inner, listen, dispatch, children, pure, update } = props

  React.useEffect(() => {
    if (listen && listen.setValues) {
      const remove = listen.setValues(data => {
        inner.list = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onClick = (e, value) => {
    if (inner.clickClose) onClose()
    if (dispatch && dispatch.onClick) dispatch.onClick(value, e)
  }

  const onClose = () => {
    inner.open = false
    update()
  }

  const onOpen = () => {
    inner.open = true
    update()
  }

  const ref = React.useRef()

  return <>
    <div
      {...compound}
      ref={el => ref.current = el}
      onClick={inner.openType === 'click' ? onOpen : undefined}
      onMouseOver={inner.openType === 'mouseover' ? onOpen : undefined}
    >
      {
        children && children.main ? children.main() : null
      }
    </div>
    <Menu open={pure && inner.open} onClose={onClose} anchorEl={ref.current}>
      {
        inner.options.map((i, index) => {
          return <MenuItem key={index} onClick={e => onClick(e, i.value)}>
            {
              i.label
            }
          </MenuItem>
        })
      }
    </Menu>
  </>
}

export default Render