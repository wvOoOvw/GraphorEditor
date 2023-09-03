const information = {
  name: 'Input',
  type: 'Basic',
  monitor: [
    { value: 'setValue', label: 'Set Value' },
    { value: 'clearValue', label: 'Clear Value' }
  ],
  trigger: [
    { value: 'onChange', label: 'On Change' },
    { value: 'onFocus', label: 'On Focus' },
    { value: 'onBlur', label: 'On Blur' }
  ],
  style: [
    { value: 'content', label: 'Content' }
  ],
  property: {
    value: '',
    placeholder: '',
    type: 'text',
    disabled: false,
    fileMultiple: false,
    fileAccept: '*'
  }
}

export default information