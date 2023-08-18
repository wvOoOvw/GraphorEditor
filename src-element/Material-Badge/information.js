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
    { value: '@onMouseLeave', label: 'Mouse Leave'},
    { value: '@onMouseMove', label: 'Mouse Move' },
    { value: '@onMouseDown', label: 'Mouse Down' },
    { value: '@onMouseUp', label: 'Mouse Up' },
  ],
  style: {},
  property: {
    content: 0,
    color: 'primary',
    variant: 'standard',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
  }
}

export default information