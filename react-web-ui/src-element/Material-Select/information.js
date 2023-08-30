const information = {
  name: 'Select',
  type: 'Material UI Component',
  monitor: [
    { value: 'setValue', label: 'Set Value' },
    { value: 'setOptions', label: 'Set Options' },
  ],
  trigger: [
    { value: 'onChange', label: 'On Change' },
    { value: 'onOpen', label: 'Options Visible Change' },
  ],
  property: {
    value: '',
    options: [{ label: 'Option A', value: 'A' }, { label: 'Option B', value: 'B' }],
    label: 'Label',
    variant: 'outlined',
    fullWidth: true,
    size: 'medium',
    disabled: false,
    multiple: false
  }
}

export default information