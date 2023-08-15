const information = {
  name: 'Tool Effect',
  type: 'Tool',
  children: false,
  monitor: [
    { value: 'setEffect', label: 'Set Effect Event' }
  ],
  trigger: [
    { value: 'onEffect', label: 'Effect Event' }
  ],
  style: {
    $use: ['use']
  },
  property: {
    immediate: false
  }
}

export default information