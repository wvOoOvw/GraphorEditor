function Render(props) {
  const React = window.React
  const { Dialog, DialogTitle, DialogActions, DialogContent } = window.MaterialUI

  const { compound, inner, listen, dispatch, children, pure, update } = props

  React.useEffect(() => {
    if (listen && listen.setOpenTrue) {
      const remove = listen.setOpenTrue(data => {
        inner.open = true
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (listen && listen.setOpenFalse) {
      const remove = listen.setOpenFalse(data => {
        inner.open = false
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onClose = (e) => {
    inner.open = false
    update()
    if (dispatch && dispatch.onClose) dispatch.onClose(inner.open, e)
  }

  const R = <>
    <DialogTitle>
      {
        children && children.title ? children.title() : null
      }
    </DialogTitle>

    <DialogContent dividers={inner.dividers}>
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

  if (pure) return <Dialog open={inner.open} sx={{ '& .MuiDialog-paper': compound.style }} onClose={onClose}>
    {R}
  </Dialog>

  if (!pure) return <div {...compound}>
    {R}
  </div>
}

export default Render