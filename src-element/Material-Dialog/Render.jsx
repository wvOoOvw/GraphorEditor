function Render(props) {
  const React = window.React
  const { Dialog, DialogTitle, DialogActions, DialogContent } = window.MaterialUI

  const { compound, property, monitor, trigger, children, pure, update } = props

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

  if (pure) return <Dialog open={property.open} sx={{ '& .MuiDialog-paper': compound.style }} onClose={onClose}>
    {R}
  </Dialog>

  if (!pure) return <div {...compound}>
    {R}
  </div>
}

export default Render