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

  const onOpen = (e) => {
    inner.open = true
    update()
    if (dispatch && dispatch.onOpen) dispatch.onOpen(inner.open, e)
  }

  const onClose = (e) => {
    inner.open = false
    update()
    if (dispatch && dispatch.onClose) dispatch.onClose(inner.open, e)
  }

  const R = children && children.main ? children.main() : null

  if (pure) return <TooltipS
    open={inner.open}
    enenterDelay={inner.enterDelay}
    leaveDelay={inner.leaveDelay}
    title={children && children.float ? children.float() : null}
    placement={inner.placementPosition + (inner.placementAlign === 'center' ? '' : '-' + inner.placementAlign)}
    arrow={inner.arrow}
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