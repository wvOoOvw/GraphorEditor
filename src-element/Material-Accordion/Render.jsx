import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material'

function Icon() {
  return <div style={{ width: 24, height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ position: 'absolute', background: 'gray', width: 6 * Math.sqrt(2), height: 2, transform: 'translateX(3px) rotateZ(-45deg)' }}></div>
    <div style={{ position: 'absolute', background: 'gray', width: 6 * Math.sqrt(2), height: 2, transform: 'translateX(-3px) rotateZ(45deg)' }}></div>
  </div>
}

function Render(props) {
  const { event, property, monitor, trigger, children, env, update } = props

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
    if (env === 'dev') return
    property.expanded = !property.expanded
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.expanded, e)
  }

  return <Accordion {...event} {...style} expanded={property.expanded} onChange={onChange} disabled={property.disabled}>

    <AccordionSummary expandIcon={property.expandIcon ? <Icon /> : undefined}>
      {
        property.title
      }
    </AccordionSummary>

    {
      property.divider ? <Divider /> : null
    }

    <AccordionDetails>
      {
        children && children.main ? children.main() : null
      }
    </AccordionDetails>

  </Accordion>
}

export default Render