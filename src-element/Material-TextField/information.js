const information = {
  name: 'Text Field',
  type: 'Material UI Component',
  monitor: [
    { value: 'setValue', label: 'Set Value' },
    { value: 'clearValue', label: 'Clear Value' },
  ],
  trigger: [
    { value: 'onChange', label: 'On Change' },
    { value: 'onFocus', label: 'On Focus' },
    { value: 'onBlur', label: 'On Blur' }
  ],
  property: {
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