import React from 'react'
import { Badge } from '@mui/material'

function Render(props) {
  const { event, property, monitor, children, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setContent) {
      const remove = monitor.setContent(data => {
        property.content = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <Badge {...event} {...style} badgeContent={Number(property.content)} max={99999} color={property.color} variant={property.variant} anchorOrigin={property.anchorOrigin}>
    {
      children && children.main ? children.main() : null
    }
  </Badge>
}

export default Render