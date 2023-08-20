const information = {
  name: 'Event Store',
  type: 'Tool',
  children: false,
  monitor: [
    { value: 'monitorEvent', label: 'Monitor Event' }
  ],
  trigger: [
    { value: 'triggerEvent', label: 'Trigger Event' }
  ],
  style: {
    $use: ['use']
  },
  property: {
    immediate: false
  }
}

export default information