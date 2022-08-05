const information = {
  name: '悬浮浮窗',
  type: '集成 MATERIAL',
  children: [
    { value: 'main', label: '主模块' },
    { value: 'float', label: '浮窗模块' }
  ],
  listen: [
    { value: '@setVisibleTrue', label: '显示' },
    { value: '@setVisibleFalse', label: '隐藏' },
    { value: '@setOpenTure', label: '打开' },
    { value: '@setOpenFalse', label: '关闭' },
  ],
  dispatch: [
    { value: 'onOpen', label: '打开' },
    { value: 'onClose', label: '关闭' },
  ],
  outer: {
    $use: ['render', 'visible']
  },
  inner: {
    open: false,
    arrow: false,
    placementPosition: 'bottom',
    placementAlign: 'center',
    enterDelay: 0,
    leaveDelay: 0
  }
}

export default information