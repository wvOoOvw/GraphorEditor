const information = {
  name: 'Http Request',
  type: 'Tool',
  monitor: [
    { value: 'request', label: 'Request' }
  ],
  trigger: [
    { value: 'onResponse', label: 'Request Response' },
    { value: 'onError', label: 'Request Error' }
  ],
  property: {
    mode: 'fetch',
    method: 'post',
    bodyType: 'json',
    baseUrl: ''
  }
}

export default information