const information = {
  name: '事件库',
  type: '工具',
  children: false,
  listen: [
    { value: 'setEffect', label: '定义执行函数' }
  ],
  dispatch: [
    { value: 'onEffect', label: '执行' }
  ],
  outer: {
    $use: ['render']
  },
  inner: {
    immediate: false
  }
}

export default information