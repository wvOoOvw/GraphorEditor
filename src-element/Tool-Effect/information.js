const information = {
  name: '事件库',
  type: 'Tool',
  children: false,
  monitor: [
    { value: 'setEffect', label: '定义执行函数' }
  ],
  trigger: [
    { value: 'onEffect', label: '执行' }
  ],
  style: {
    $use: ['use']
  },
  property: {
    immediate: false
  }
}

export default information