import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material'

function Icon() {
  return <div style={{ width: 24, height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ position: 'absolute', background: 'gray', width: 6 * Math.sqrt(2), height: 2, transform: 'translateX(3px) rotateZ(-45deg)' }}></div>
    <div style={{ position: 'absolute', background: 'gray', width: 6 * Math.sqrt(2), height: 2, transform: 'translateX(-3px) rotateZ(45deg)' }}></div>
  </div>
}

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  const onChange = (e) => {
    property.expanded = !property.expanded
    update()
    if (trigger && trigger.onExpandAccordion && property.expanded === true) trigger.onExpandAccordion(property.expanded, e)
    if (trigger && trigger.onCollapseAccordion && property.expanded === false) trigger.onCollapseAccordion(property.expanded, e)
  }

  React.useEffect(() => {
    if (monitor && monitor.expandAccordion) {
      const remove = monitor.expandAccordion(data => {
        property.expanded = true
        update()
        if (trigger && trigger.onExpandAccordion) trigger.onExpandAccordion(property.expanded)
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.collapseAccordion) {
      const remove = monitor.collapseAccordion(data => {
        property.expanded = false
        update()
        if (trigger && trigger.onCollapseAccordion) trigger.onCollapseAccordion(property.expanded)
      })
      return () => { remove() }
    }
  }, [])

  if (env === 'dev') {
    return <Accordion {...devParams} expanded={property.expanded} disabled={property.disabled} disableGutters={property.disableGutters} square={property.square} sx={{ '&.MuiAccordion-root': style.accordion, '& .MuiAccordionSummary-root': style.accordionSummary, '& .MuiAccordionDetails-root': style.accordionDetails }}>

      <AccordionSummary {...children.accordionSummary.devParams} expandIcon={property.expandIcon ? <Icon /> : undefined}>
        {
          property.customSummary === true ?
            (
              children.accordionSummary()
            )
            : null
        }
        {
          property.customSummary === false ?
            (
              property.summary
            )
            : null
        }
      </AccordionSummary>

      {
        property.divider ? <Divider /> : null
      }

      <AccordionDetails {...children.accordionDetails.devParams}>
        {
          children.accordionDetails()
        }
      </AccordionDetails>

    </Accordion>
  }

  if (env === 'prod') {
    return <Accordion expanded={property.expanded} disabled={property.disabled} disableGutters={property.disableGutters} square={property.square} sx={{ '.MuiAccordion-root': style.accordion, '.MuiAccordionSummary-root': style.accordionSummary, '.MuiAccordionDetails-root': style.accordionDetails }} onChange={onChange}>

      <AccordionSummary expandIcon={property.expandIcon ? <Icon /> : undefined}>
        {
          property.customSummary === true ?
            (
              children.accordionSummary(prop)
            )
            : null
        }
        {
          property.customSummary === false ?
            (
              property.summary
            )
            : null
        }
      </AccordionSummary>

      {
        property.divider ? <Divider /> : null
      }

      <AccordionDetails>
        {
          children.accordionDetails(prop)
        }
      </AccordionDetails>

    </Accordion>
  }
}

export default Render