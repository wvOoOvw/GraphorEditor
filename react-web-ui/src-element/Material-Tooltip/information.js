const information = {
  name: 'Tooltip',
  type: 'Material UI Component',
  children: [
    { value: 'main', label: 'Main' },
    { value: 'float', label: 'Float' }
  ],
  monitor: [
    { value: '@setUseTrue', label: 'Use Element' },
    { value: '@setUseFalse', label: 'Unuse Element' },
    { value: '@setOpenTure', label: 'Open Tooltip' },
    { value: '@setOpenFalse', label: 'Close Tootip' },
  ],
  trigger: [
    { value: 'onOpen', label: 'Open' },
    { value: 'onClose', label: 'Close' },
  ],
  style: {
    '$use': ['use']
  },
  property: {
    open: false,
    arrow: false,
    placementPosition: 'bottom',
    placementAlign: 'center',
    enterDelay: 0,
    leaveDelay: 0
  }
}

export default information