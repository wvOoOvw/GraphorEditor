const information = {
  name: 'Http Request',
  type: 'Tool',
  monitor: [
    { value: 'request', label: 'Request' }
  ],
  trigger: [
    { value: 'onSuccess', label: 'On Success' },
    { value: 'onError', label: 'On Error' }
  ],
  property: {
    mode: 'fetch',
    method: 'post',
    bodyType: 'json',
    baseUrl: ''
  }
}

export default information