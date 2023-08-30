const information = {
  name: 'Text Field',
  type: 'Material UI Component',
  children: false,
  monitor: [
    { value: '@setUseTrue', label: 'Use Element' },
    { value: '@setUseFalse', label: 'Unuse Element' },
    { value: 'setValue', label: 'Set Value' },
    { value: 'setValueEmpty', label: 'Clear Value' },
  ],
  trigger: [
    { value: '@onClick', label: 'Click' },
    { value: '@onDoubleClick', label: 'Double Click' },
    { value: '@onMouseEnter', label: 'Mouse Enter' },
    { value: '@onMouseLeave', label: 'Mouse Leave' },
    { value: '@onMouseMove', label: 'Mouse Move' },
    { value: '@onMouseDown', label: 'Mouse Down' },
    { value: '@onMouseUp', label: 'Mouse Up' },
    { value: 'onChange', label: 'Value Change' },
    { value: 'onFocus', label: 'Focus' },
    { value: 'onBlur', label: 'Blur' }
  ],
  style: {
    '$use': ['use']
  },  property: {
    type: 'text',
    value: '',
    placeholder: '',
    variant: 'outlined',
    fullWidth: true,
    color: 'primary',
    label: 'Label',
    size: 'medium',
    disabled: false,
    multiline: false,
    rows: 'auto',

  }
}

export default information