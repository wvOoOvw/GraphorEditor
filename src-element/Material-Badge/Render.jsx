import React from 'react'
import { Badge } from '@mui/material'

function Render(props) {
  const { event, style, property, monitor, children, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setContent) {
      const remove = monitor.setContent(data => {
        property.badgeContent = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <Badge {...event} {...style} badgeContent={Number(property.badgeContent)} color={property.color} variant={property.variant} anchorOrigin={property.anchorOrigin} invisible={property.invisible} max={Number(property.max)} overlap={property.overlap} showZero={property.showZero} sx={property.sx}>
    {
      children && children.main ? children.main() : null
    }
  </Badge>
}

export default Render