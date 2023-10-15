const information = {
  name: 'Tooltip',
  type: 'Material UI Component',
  children: [
    { value: 'tooltipContent', label: 'Tooltip Content' },
    { value: 'tooltipPopup', label: 'Tooltip Popup' }
  ],
  monitor: [
    { value: 'openTooltip', label: 'Open Tooltip' },
    { value: 'closeTootip', label: 'Close Tootip' },
  ],
  trigger: [
    { value: 'onOpen', label: 'On Open' },
    { value: 'onClose', label: 'On Close' },
  ],
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