const information = {
  name: 'Pagination',
  type: 'Material UI Component',
  children: false,
  monitor: [
    { value: '@setUseTrue', label: 'Use Element' },
    { value: '@setUseFalse', label: 'Unuse Element' },
    { value: 'setPage', label: 'Set Page' },
    { value: 'setCount', label: 'Set Count' },
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
  style: {
    '$use': ['use']
  },  property: {
    page: 1,
    count: 10,
    variant: 'text',
    shape: 'circular',
    color: 'primary',
    size: 'medium'
  }
}

export default information