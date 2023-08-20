const information = {
  name: 'RadioGroup',
  type: 'Material UI Component',
  children: false,
  monitor: [
    { value: '@setUseTrue', label: 'Use Element' },
    { value: '@setUseFalse', label: 'Unuse Element' },
    { value: 'setValue', label: 'Set Value' },
    { value: 'setOptions', label: 'Set Options' },
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
    value: '',
    options: [{ label: 'Option A', value: 'A' }, { label: 'Option B', value: 'B' }],
    color: 'primary',
    size: 'medium',
    disabled: false
  }
}

export default information