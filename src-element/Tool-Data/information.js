const information = {
  name: '数据库',
  type: '工具',
  children: false,
  listen: [
    { value: 'setValue', label: '设置数据' },
    { value: 'assignValue', label: '合并数据' },
  ],
  dispatch: [
    { value: 'onEffect', label: '执行' }
  ],
  outer: {
    $use: ['render']
  },
  inner: {
    value: {},
    immediate: false,
    useWindow: false,
    windowName: '',
  }
}

export default information