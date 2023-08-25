import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material'

function Icon() {
  return <div style={{ width: 24, height: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ position: 'absolute', background: 'gray', width: 6 * Math.sqrt(2), height: 2, transform: 'translateX(3px) rotateZ(-45deg)' }}></div>
    <div style={{ position: 'absolute', background: 'gray', width: 6 * Math.sqrt(2), height: 2, transform: 'translateX(-3px) rotateZ(45deg)' }}></div>
  </div>
}

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

  const onChange = (e) => {
    property.expanded = !property.expanded
    update()
    if (trigger && trigger.onChange) trigger.onChange(property.expanded, e)
  }

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

  if (env === 'dev') {
    return <Accordion {...params} expanded={property.expanded} disabled={property.disabled} disableGutters={property.disableGutters} square={property.square} sx={property.sx}>

      <AccordionSummary expandIcon={property.expandIcon ? <Icon /> : undefined}>
        {
          property.titleCustom === true ?
            (
              children && children.title ? children.title(prop) : null
            )
            : null
        }
        {
          property.titleCustom === false ?
            (
              property.title
            )
            : null
        }
      </AccordionSummary>

      {
        property.divider ? <Divider /> : null
      }

      <AccordionDetails>
        {
          children && children.main ? children.main(prop) : null
        }
      </AccordionDetails>

    </Accordion>
  }

  if (env === 'prod') {
    return <Accordion {...params} expanded={property.expanded} onChange={onChange} disabled={property.disabled} disableGutters={property.disableGutters} square={property.square} sx={property.sx}>

      <AccordionSummary expandIcon={property.expandIcon ? <Icon /> : undefined}>
        {
          property.titleCustom === true ?
            (
              children && children.title ? children.title(prop) : null
            )
            : null
        }
        {
          property.titleCustom === false ?
            (
              property.title
            )
            : null
        }
      </AccordionSummary>

      {
        property.divider ? <Divider /> : null
      }

      <AccordionDetails>
        {
          children && children.main ? children.main(prop) : null
        }
      </AccordionDetails>

    </Accordion>
  }
}

export default Render