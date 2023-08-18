const information = {
  name: 'Dialog',
  type: 'Material UI Component',
  children: [
    { value: 'main', label: 'Main' },
    { value: 'title', label: 'Title' },
    { value: 'action', label: 'Action ' }
  ],
  monitor: [
    { value: '@setUseTrue', label: 'Use Element' },
    { value: '@setUseFalse', label: 'Unuse Element' },
    { value: '@setOpenTure', label: 'Open' },
    { value: '@setOpenFalse', label: 'Close' },
  ],
  trigger: [
    { value: 'onClose', label: 'Close' },
  ],
  style: {},
  property: {
    open: true,
    dividers: true,
    enableClose: true,
  }
}

export default information