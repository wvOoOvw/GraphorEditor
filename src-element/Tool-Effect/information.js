const information = {
  name: '事件库',
  type: 'Tool',
  children: false,
  listen: [
    { value: 'setEffect', label: '定义执行函数' }
  ],
  dispatch: [
    { value: 'onEffect', label: '执行' }
  ],
  style: {
    $use: ['render']
  },
  property: {
    immediate: false
  }
}

export default information