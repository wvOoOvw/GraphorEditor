const information = {
  name: 'Button',
  type: 'Material UI Component',
  children: false,
  monitor: [
    { value: '@setUseTrue', label: 'Use Element' },
    { value: '@setUseFalse', label: 'Unuse Element' },
    { value: 'setValue', label: 'Set Value' },
    { value: 'setDisabledOpen', label: 'Disable Button' },
    { value: 'setDisabledClose', label: 'Enable Button' }
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
    value: 'Button',
    variant: 'contained',
    color: 'primary',
    href: '',
    disabled: false,
    fullWidth: false,
  }
}

export default information