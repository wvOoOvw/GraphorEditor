import React from 'react'

function Render(props) {
  const { Dialog, DialogTitle, DialogActions, DialogContent } = window.MaterialUI

  const { event, property, monitor, trigger, children, env, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setOpenTrue) {
      const remove = monitor.setOpenTrue(data => {
        property.open = true
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.setOpenFalse) {
      const remove = monitor.setOpenFalse(data => {
        property.open = false
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onClose = (e) => {
    property.open = false
    update()
    if (trigger && trigger.onClose) trigger.onClose(property.open, e)
  }

  const R = <>
    <DialogTitle>
      {
        children && children.title ? children.title() : null
      }
    </DialogTitle>

    <DialogContent dividers={property.dividers}>
      {
        children && children.main ? children.main() : null
      }
    </DialogContent>

    <DialogActions>
      {
        children && children.action ? children.action() : null
      }
    </DialogActions>
  </>

  if (env === 'prod') return <Dialog open={property.open} sx={{ '& .MuiDialog-paper': event.style }} onClose={onClose}>
    {R}
  </Dialog>

  if (env === 'dev') return <div {...event}>
    {R}
  </div>
}

export default Render