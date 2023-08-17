import React from 'react'

import { Accordion } from '@mui/material'
import { AccordionSummary } from '@mui/material'
import { AccordionDetails } from '@mui/material'

function View() {
  return <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Accordion style={{ width: '100%' }}>
      <AccordionSummary>
        AccordionSummary
      </AccordionSummary>
      <AccordionDetails>
        AccordionDetails
      </AccordionDetails>
    </Accordion>
  </div>
}

export default View