import React from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  React.useEffect(() => {
    if (monitor && monitor.openDialog) {
      const remove = monitor.openDialog(data => {
        property.open = true
        update()
        if (trigger && trigger.onOpen) trigger.onOpen(property.open)
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.closeDialog) {
      const remove = monitor.closeDialog(data => {
        property.open = false
        update()
        if (trigger && trigger.onClose) trigger.onClose(property.open)
      })
      return () => { remove() }
    }
  }, [])

  const onClose = (e) => {
    property.open = false
    update()
    if (trigger && trigger.onClose) trigger.onClose(property.open, e)
  }

  if (env === 'dev') {
    return <div {...devParams}>
      <DialogTitle {...children.dialogTitle.devParams}>
        {
          children.dialogTitle()
        }
      </DialogTitle>

      <DialogContent {...children.dialogContent.devParams} dividers={property.dividers}>
        {
          children.dialogContent()
        }
      </DialogContent>

      <DialogActions {...children.dialogAction.devParams}>
        {
          children.dialogAction()
        }
      </DialogActions>
    </div>
  }

  if (env === 'prod') {
    return <Dialog {...devParams} open={property.open} onClose={onClose}>
      <DialogTitle>
        {
          children.dialogTitle(prop)
        }
      </DialogTitle>

      <DialogContent dividers={property.dividers}>
        {
          children.dialogContent(prop)
        }
      </DialogContent>

      <DialogActions>
        {
          children.dialogAction(prop)
        }
      </DialogActions>
    </Dialog>
  }
}

export default Render