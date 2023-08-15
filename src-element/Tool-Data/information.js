const information = {
  name: 'Tool Data',
  type: 'Tool',
  children: false,
  monitor: [
    { value: 'setValue', label: 'Set Value' },
    { value: 'assignValue', label: 'Assign Value' },
  ],
  trigger: [
    { value: 'onEffect', label: 'Effect' }
  ],
  style: {
    $use: ['use']
  },
  property: {
    value: {},
    immediate: false,
    useWindow: false,
    windowName: '',
  }
}

export default information