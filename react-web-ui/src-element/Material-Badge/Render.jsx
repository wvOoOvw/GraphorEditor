import React from 'react'
import { Badge } from '@mui/material'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

  React.useEffect(() => {
    if (monitor && monitor.setContent) {
      const remove = monitor.setContent(data => {
        property.badgeContent = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  return <Badge {...params} badgeContent={Number(property.badgeContent)} color={property.color} variant={property.variant} anchorOrigin={property.anchorOrigin} invisible={property.invisible} max={Number(property.max)} overlap={property.overlap} showZero={property.showZero} sx={property.sx}>
    {
      children && children.main ? children.main() : null
    }
  </Badge>
}

export default Render