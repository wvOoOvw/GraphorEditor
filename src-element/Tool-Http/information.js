const information = {
  name: '网路请求',
  type: 'Tool',
  children: false,
  monitor: [
    { value: 'setRequest', label: '设置请求' }
  ],
  trigger: [
    { value: 'onResponse', label: '请求成功' },
    { value: 'onError', label: '请求失败' }
  ],
  style: {
    $use: ['render']
  },
  property: {
    mode: 'fetch',
    method: 'post',
    bodyType: 'json',
    baseUrl: ''
  }
}

export default information