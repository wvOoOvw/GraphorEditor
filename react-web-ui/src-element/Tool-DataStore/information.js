const information = {
  name: 'Data Store',
  type: 'Tool',
  monitor: [
    { value: 'setValue', label: 'Set Value' },
    { value: 'assignValue', label: 'Assign Value' },
    { value: 'initValue', label: 'Init Value' },
    { value: 'triggerOutput', label: 'Trigger Output' },
  ],
  trigger: [
    { value: 'onChange', label: 'On Change' },
    { value: 'output', label: 'Output' }
  ],
  property: {
    value: {},
    initValue: {},
    immediateOuput: false,
    useWindow: false,
    windowName: '',
  }
}

export default information