const information = {
  name: 'Input',
  type: 'Basic',
  monitor: [
    { value: 'Set Value', label: 'Set Value' },
    { value: 'Clear Value', label: 'Clear Value' }
  ],
  trigger: [
    { value: 'onChange', label: 'On Change' },
    { value: 'onFocus', label: 'On Focus' },
    { value: 'onBlur', label: 'On Blur' }
  ],
  style: [
    { value: 'main', label: 'Main' }
  ],
  property: {
    value: 'Input',
    placeholder: '',
    type: 'text',
    disabled: false,
    fileMultiple: false,
    fileAccept: '*'
  }
}

export default information