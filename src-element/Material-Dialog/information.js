const information = {
  name: '对话窗',
  type: 'Material UI Component',
  children: [
    { value: 'main', label: '主模块' },
    { value: 'title', label: '标题模块' },
    { value: 'action', label: '操作栏模块' }
  ],
  monitor: [
    { value: '@setUseTrue', label: 'Use Element' },
    { value: '@setUseFalse', label: 'Unuse Element' },
    { value: '@setOpenTure', label: '打开' },
    { value: '@setOpenFalse', label: '关闭' },
  ],
  trigger: [
    { value: 'onClose', label: '关闭' },
  ],
  style: {
    $use: ['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'zIndex', 'use', 'visible']
  },
  property: {
    open: true,
    dividers: true,
  }
}

export default information