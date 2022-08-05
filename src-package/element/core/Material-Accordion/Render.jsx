function Icon() {
  return <div style={{ width: 24, height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ position: 'absolute', background: 'gray', width: 6 * Math.sqrt(2), height: 2, transform: 'translateX(3px) rotateZ(-45deg)' }}></div>
    <div style={{ position: 'absolute', background: 'gray', width: 6 * Math.sqrt(2), height: 2, transform: 'translateX(-3px) rotateZ(45deg)' }}></div>
  </div>
}

function Render(props) {
  const React = window.React
  const { Accordion, AccordionSummary, AccordionDetails, Divider } = window.MaterialUI

  const { compound, inner, listen, dispatch, children, pure, update } = props

  React.useEffect(() => {
    if (listen && listen.setExpandedOpen) {
      const remove = listen.setExpandedOpen(data => {
        inner.expanded = true
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (listen && listen.setExpandedClose) {
      const remove = listen.setExpandedClose(data => {
        inner.expanded = false
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e) => {
    if (!pure) return
    inner.expanded = !inner.expanded
    update()
    if (dispatch && dispatch.onChange) dispatch.onChange(inner.expanded, e)
  }

  return <Accordion {...compound} expanded={inner.expanded} onChange={onChange} disabled={inner.disabled}>

    <AccordionSummary style={{ minHeight: 'auto', height: isNaN(inner.summaryHeight) ? inner.summaryHeight : inner.summaryHeight + 'px', transition: '0.5s all' }} expandIcon={inner.expandIcon ? <Icon /> : undefined}>
      {
        inner.title
      }
    </AccordionSummary>

    {
      inner.divider ? <Divider /> : null
    }

    <AccordionDetails style={{ position: 'relative', height: isNaN(inner.detailsHeight) ? inner.detailsHeight : inner.detailsHeight + 'px', padding: 0, transition: '0.5s all', overflow: 'scroll' }}>
      {
        children && children.main ? children.main() : null
      }
    </AccordionDetails>

  </Accordion>
}

export default Render