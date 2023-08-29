import React from 'react'
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

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
    if (property.enableClose === false) return

    property.open = false
    update()
    if (trigger && trigger.onClose) trigger.onClose(property.open, e)
  }

  if (env === 'dev') {
    return <div {...params}>
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
    </div>
  }

  if (env === 'prod') {
    return <Dialog open={property.open} onClose={onClose} sx={{ '& .MuiDialog-paper': style.style }}>
      <DialogTitle>
        {
          children && children.title ? children.title(prop) : null
        }
      </DialogTitle>

      <DialogContent dividers={property.dividers}>
        {
          children && children.main ? children.main(prop) : null
        }
      </DialogContent>

      <DialogActions>
        {
          children && children.action ? children.action(prop) : null
        }
      </DialogActions>
    </Dialog>
  }
}

export default Render