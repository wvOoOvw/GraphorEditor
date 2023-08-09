import React from 'react'

import { Accordion } from '@mui/material'
import { AccordionSummary } from '@mui/material'
import { AccordionDetails } from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function App(props) {
  const { defaultExpanded, title, children, style } = props

  const [expand, setExpand] = React.useState(defaultExpanded)

  return <Accordion expanded={expand} onChange={(e, v) => setExpand(v)} style={style}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ fontWeight: 'bold', height: 64 }}>
      {
        title
      }
    </AccordionSummary>
    <AccordionDetails>
      {
        children
      }
    </AccordionDetails>
  </Accordion>
}

export default App