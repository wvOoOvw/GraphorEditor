function Render(props) {
  const React = window.React
  const { MenuList, MenuItem } = window.MaterialUI

  const { compound, property, listen, dispatch, update } = props

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
    if (dispatch && dispatch.onClick) dispatch.onClick(value, e)
  }

  return <MenuList {...compound}>
    {
      property.options.map((i, index) => {
        return <MenuItem key={index} onClick={e => onClick(e, i.value)}>
          {
            i.label
          }
        </MenuItem>
      })
    }
  </MenuList>
}

export default Render