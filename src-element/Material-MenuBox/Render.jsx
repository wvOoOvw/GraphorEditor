function Render(props) {
  const React = window.React
  const { Menu, MenuItem } = window.MaterialUI

  const { compound, property, listen, dispatch, children, pure, update } = props

  React.useEffect(() => {
    if (listen && listen.setValues) {
      const remove = listen.setValues(data => {
        property.list = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onClick = (e, value) => {
    if (property.clickClose) onClose()
    if (dispatch && dispatch.onClick) dispatch.onClick(value, e)
  }

  const onClose = () => {
    property.open = false
    update()
  }

  const onOpen = () => {
    property.open = true
    update()
  }

  const ref = React.useRef()

  return <>
    <div
      {...compound}
      ref={el => ref.current = el}
      onClick={property.openType === 'click' ? onOpen : undefined}
      onMouseOver={property.openType === 'mouseover' ? onOpen : undefined}
    >
      {
        children && children.main ? children.main() : null
      }
    </div>
    <Menu open={pure && property.open} onClose={onClose} anchorEl={ref.current}>
      {
        property.options.map((i, index) => {
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