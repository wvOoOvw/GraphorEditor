const information = {
  name: 'Accordion',
  type: 'Material UI Component',
  children: [
    { value: 'accordionSummary', label: 'Accordion Summary' },
    { value: 'accordionDetails', label: 'Accordion Details' },
  ],
  monitor: [
    { value: 'expandAccordion', label: 'Expand Accordion' },
    { value: 'collapseAccordion', label: 'Collapse Accordion' },
  ],
  trigger: [
    { value: 'onExpandAccordion', label: 'On Expand Accordion' },
    { value: 'onCollapseAccordion', label: 'On Collapse Accordion' },
  ],
  style: [
    { value: 'accordion', label: 'Accordion' },
    { value: 'accordionSummary', label: 'Accordion Summary' },
    { value: 'accordionDetails', label: 'Accordion Details' },
  ],
  property: {
    summary: 'Accordion Summary',
    customSummary: false,
    expanded: true,
    expandIcon: true,
    divider: true,
    disabled: false,
    disableGutters: false,
    square: false,
  }
}

export default information