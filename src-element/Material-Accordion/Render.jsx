function Icon() {
  return <div style={{ width: 24, height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ position: 'absolute', background: 'gray', width: 6 * Math.sqrt(2), height: 2, transform: 'translateX(3px) rotateZ(-45deg)' }}></div>
    <div style={{ position: 'absolute', background: 'gray', width: 6 * Math.sqrt(2), height: 2, transform: 'translateX(-3px) rotateZ(45deg)' }}></div>
  </div>
}

import React from 'react'

function Render(props) {
  const { Accordion, AccordionSummary, AccordionDetails, Divider } = window.MaterialUI

  const { event, property, monitor, trigger, children, pure, update } = props

  React.useEffect(() => {
    if (monitor && monitor.setExpandedOpen) {
      const remove = monitor.setExpandedOpen(data => {
        property.expanded = true
        update()
      })
      return () => { remove() }
    }
  }, [])
  React.useEffect(() => {
    if (monitor && monitor.setExpandedClose) {
      const remove = monitor.setExpandedClose(data => {
        property.expanded = false
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onChange = (e) => {
    if (!pure) return
    property.expanded = !property.expanded
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.expanded, e)
  }

  return <Accordion {...event} {...style} expanded={property.expanded} onChange={onChange} disabled={property.disabled}>

    <AccordionSummary style={{ minHeight: 'auto', height: isNaN(property.summaryHeight) ? property.summaryHeight : property.summaryHeight + 'px', transition: '0.5s all' }} expandIcon={property.expandIcon ? <Icon /> : undefined}>
      {
        property.title
      }
    </AccordionSummary>

    {
      property.divider ? <Divider /> : null
    }

    <AccordionDetails style={{ position: 'relative', height: isNaN(property.detailsHeight) ? property.detailsHeight : property.detailsHeight + 'px', padding: 0, transition: '0.5s all', overflow: 'scroll' }}>
      {
        children && children.main ? children.main() : null
      }
    </AccordionDetails>

  </Accordion>
}

export default Render