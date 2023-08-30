const information = {
  name: 'Badge',
  type: 'Material UI Component',
  children: [
    { value: 'main', label: '主模块' }
  ],
  monitor: [
    { value: '@setUseTrue', label: 'Use Element' },
    { value: '@setUseFalse', label: 'Unuse Element' },
    { value: 'setContent', label: 'Set Content' },
  ],
  trigger: [
    { value: '@onClick', label: 'Click' },
    { value: '@onDoubleClick', label: 'Double Click' },
    { value: '@onMouseEnter', label: 'Mouse Enter' },
    { value: '@onMouseLeave', label: 'Mouse Leave' },
    { value: '@onMouseMove', label: 'Mouse Move' },
    { value: '@onMouseDown', label: 'Mouse Down' },
    { value: '@onMouseUp', label: 'Mouse Up' },
  ],
  style: {
    '$use': ['use']
  },  property: {
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