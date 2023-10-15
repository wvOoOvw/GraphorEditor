import React from 'react'
import { Tooltip } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  React.useEffect(() => {
    if (monitor && monitor.openTooltip) {
      const remove = monitor.openTooltip(data => {
        property.open = true
        update()
    if (trigger && trigger.onOpen) trigger.onOpen(property.open, e)
  })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.closeTootip) {
      const remove = monitor.closeTootip(data => {
        property.open = false
        update()
    if (trigger && trigger.onClose) trigger.onClose(property.open, e)
  })
      return () => { remove() }
    }
  }, [])

  const onOpen = (e) => {
    property.open = true
    update()
    if (trigger && trigger.onOpen) trigger.onOpen(property.open, e)
  }

  const onClose = (e) => {
    property.open = false
    update()
    if (trigger && trigger.onClose) trigger.onClose(property.open, e)
  }

  if (env === 'dev') {
    return <div {...devParams}>
      <div {...children.tooltipContent.devParams}>
        {
          children.tooltipContent()
        }
      </div>
      <div {...children.tooltipPopup.devParams}>
        {
          children.tooltipPopup()
        }
      </div>
    </div>
  }

  if (env === 'prod') {
    return <Tooltip
      open={property.open}
      enterDelay={property.enterDelay}
      leaveDelay={property.leaveDelay}
      title={children.tooltipPopup()}
      placement={property.placementPosition + (property.placementAlign === 'center' ? '' : '-' + property.placementAlign)}
      arrow={property.arrow}
      onOpen={onOpen}
      onClose={onClose}
    >
      {
        children.tooltipContent()
      }
    </Tooltip>
  }
}

export default Render