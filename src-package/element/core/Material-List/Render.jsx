function Render(props) {
  const React = window.React
  const { List, ListItem, ListItemButton, ListItemText } = window.MaterialUI

  const { compound, inner, listen, dispatch, update } = props

  React.useEffect(() => {
    if (listen && listen.setValue) {
      const remove = listen.setValue(data => {
        inner.value = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onClick = (e, value) => {
    if (dispatch && dispatch.onClick) dispatch.onClick(value, e)
  }

  return <List {...compound}>
    {
      inner.value.map((i, index) => {
        return <ListItem disablePadding={inner.disablePadding} key={index}>
          <ListItemButton onClick={(e) => onClick(e, i)}>
            <ListItemText primary={i.title} secondary={i.desciption} />
          </ListItemButton>
        </ListItem>
      })
    }
  </List>
}

export default Render