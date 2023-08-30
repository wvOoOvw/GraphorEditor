import React from 'react'
import { Badge } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  React.useEffect(() => {
    if (monitor && monitor.setBadgeContent) {
      const remove = monitor.setBadgeContent(data => {
        property.badgeContent = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  if (env === 'env') {
    return <Badge badgeContent={Number(property.badgeContent)} color={property.color} variant={property.variant} anchorOrigin={property.anchorOrigin} invisible={property.invisible} max={Number(property.max)} overlap={property.overlap} showZero={property.showZero}>
      {
        children && children.content ? children.content(prop) : null
      }
    </Badge>
  }

  if (env === 'prod') {
    return <Badge {...devParams} badgeContent={Number(property.badgeContent)} color={property.color} variant={property.variant} anchorOrigin={property.anchorOrigin} invisible={property.invisible} max={Number(property.max)} overlap={property.overlap} showZero={property.showZero}>
      {
        children && children.content ? children.content(prop) : null
      }
    </Badge>
  }
}

export default Render