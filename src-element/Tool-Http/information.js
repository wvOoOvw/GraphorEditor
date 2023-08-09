const information = {
  name: '网路请求',
  type: 'Tool',
  children: false,
  listen: [
    { value: 'setRequest', label: '设置请求' }
  ],
  dispatch: [
    { value: 'onResponse', label: '请求成功' },
    { value: 'onError', label: '请求失败' }
  ],
  outer: {
    $use: ['render']
  },
  inner: {
    mode: 'fetch',
    method: 'post',
    bodyType: 'json',
    baseUrl: ''
  }
}

export default information