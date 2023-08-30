const information = {
  name: 'Autocomplete',
  type: 'Material UI Component',
  monitor: [
    { value: 'setValue', label: 'Set Value' },
    { value: 'setOptions', label: 'Set Options' },
  ],
  trigger: [
    { value: 'onChange', label: 'On Change' },
  ],
  style: [
    { value: 'formControl', label: 'Form Control' },
    { value: 'inputRoot', label: 'Input Root' },
    { value: 'input', label: 'Input' },
  ],
  property: {
    value: '',
    options: ['Option A', 'Option B'],
    label: 'Label',
    variant: 'outlined',
    fullWidth: true,
    size: 'medium',
    disabled: false,
    multiple: false,
  }
}

export default information