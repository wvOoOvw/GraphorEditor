const information = {
  name: 'Toggle Button Group',
  type: 'Material UI Component',
  monitor: [
    { value: 'setValue', label: 'Set Value' },
    { value: 'setOptions', label: 'Set Options' },
  ],
  trigger: [
    { value: 'onChange', label: 'On Change' },
  ],
  property: {
    value: '',
    options: [{ label: 'Option A', value: 'A' }, { label: 'Option B', value: 'B' }],
    orientation: 'horizontal',
    size: 'medium',
    color: 'standard',
    disabled: false,
    exclusive: true,
    fullWidth: false,
  }
}

export default information