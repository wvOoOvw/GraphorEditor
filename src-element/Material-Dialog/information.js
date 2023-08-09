const information = {
  name: '对话窗',
  type: 'Material UI Component',
  children: [
    { value: 'main', label: '主模块' },
    { value: 'title', label: '标题模块' },
    { value: 'action', label: '操作栏模块' }
  ],
  listen: [
    { value: '@setVisibleTrue', label: '显示' },
    { value: '@setVisibleFalse', label: '隐藏' },
    { value: '@setOpenTure', label: '打开' },
    { value: '@setOpenFalse', label: '关闭' },
  ],
  dispatch: [
    { value: 'onClose', label: '关闭' },
  ],
  style: {
    $use: ['width', 'height', 'minWidth', 'minHeight', 'maxWidth', 'maxHeight', 'zIndex', 'render', 'visible']
  },
  property: {
    open: true,
    dividers: true,
  }
}

export default information