const information = {
  name: 'Accordion',
  type: 'Material UI Component',
  children: [
    { value: 'main', label: 'Main' },
    { value: 'title', label: 'Title' },
  ],
  monitor: [
    { value: '@setUseTrue', label: 'Use Element' },
    { value: '@setUseFalse', label: 'Unuse Element' },
    { value: 'setExpandedOpen', label: 'Open Accordion' },
    { value: 'setExpandedClose', label: 'Close Accordion' },
  ],
  trigger: [
    { value: '@onClick', label: 'Click' },
    { value: '@onDoubleClick', label: 'Double Click' },
    { value: '@onMouseEnter', label: 'Mouse Enter' },
    { value: '@onMouseLeave', label: 'Mouse Leave' },
    { value: '@onMouseMove', label: 'Mouse Move' },
    { value: '@onMouseDown', label: 'Mouse Down' },
    { value: '@onMouseUp', label: 'Mouse Up' },
    { value: 'onExpandedChange', label: 'Expanded Change' },
    { value: 'onExpandedOpen', label: 'Open' },
    { value: 'onExpandedClose', label: 'Close' },
  ],
  style: {},
  property: {
    title: 'Accordion',
    titleCustom: false,
    expanded: true,
    expandIcon: true,
    divider: true,
    disabled: false,
    disableGutters: false,
    square: false,
    sx: { '& .MuiAccordionSummary-root': {}, '& .MuiCollapse-root': {} }
  }
}

export default information