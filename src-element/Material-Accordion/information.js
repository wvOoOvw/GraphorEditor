const information = {
  name: 'Accordion',
  type: 'Material UI Component',
  children: [
    { value: 'main', label: 'Main' }
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
    { value: '@onMouseLeave', label: 'Mouse Leave'},
    { value: '@onMouseMove', label: 'Mouse Move' },
    { value: '@onMouseDown', label: 'Mouse Down' },
    { value: '@onMouseUp', label: 'Mouse Up' },
    { value: 'onChange', label: 'Value Change' },
  ],
  style: {},
  property: {
    title: 'Accordion',
    expanded: true,
    expandIcon: true,
    divider: true,
    disabled: false
  }
}

export default information