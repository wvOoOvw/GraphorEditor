const information = {
  name: '数据库',
  type: 'Tool',
  children: false,
  monitor: [
    { value: 'setValue', label: '设置数据' },
    { value: 'assignValue', label: '合并数据' },
  ],
  trigger: [
    { value: 'onEffect', label: '执行' }
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