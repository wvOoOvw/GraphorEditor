const information = {
  name: 'Badge',
  type: 'Material UI Component',
  children: [
    { value: 'main', label: 'Main' }
  ],
  monitor: [
    { value: 'setBadgeContent', label: 'Set Badge Content' },
  ],
  trigger: [],
  property: {
    badgeContent: 0,
    color: 'primary',
    variant: 'standard',
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
    invisible: false,
    max: 99,
    overlap: 'rectangular',
    showZero: false,
  }
}

export default information