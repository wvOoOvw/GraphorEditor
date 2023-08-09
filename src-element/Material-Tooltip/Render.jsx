function Render(props) {
  const React = window.React
  const { Tooltip } = window.MaterialUI
  const { styled } = window.MaterialUI

  const TooltipS = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    '& .MuiTooltip-tooltip': {
      backgroundColor: 'white',
      padding: 0
    },
  });

  const { compound, property, listen, dispatch, children, pure, update } = props

  React.useEffect(() => {
    if (listen && listen.setOpenTrue) {
      const remove = listen.setOpenTrue(data => {
        property.open = true
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (listen && listen.setOpenFalse) {
      const remove = listen.setOpenFalse(data => {
        property.open = false
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onOpen = (e) => {
    property.open = true
    update()
    if (dispatch && dispatch.onOpen) dispatch.onOpen(property.open, e)
  }

  const onClose = (e) => {
    property.open = false
    update()
    if (dispatch && dispatch.onClose) dispatch.onClose(property.open, e)
  }

  const R = children && children.main ? children.main() : null

  if (pure) return <TooltipS
    open={property.open}
    enenterDelay={property.enterDelay}
    leaveDelay={property.leaveDelay}
    title={children && children.float ? children.float() : null}
    placement={property.placementPosition + (property.placementAlign === 'center' ? '' : '-' + property.placementAlign)}
    arrow={property.arrow}
    onOpen={onOpen}
    onClose={onClose}
  >
    <span>
      {R}
    </span>
  </TooltipS>

  if (!pure) return R
}

export default Render