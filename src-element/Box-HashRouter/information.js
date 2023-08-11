const information = {
  name: 'Hash路由容器',
  type: 'Box',
  children: [
    { value: 'main', label: '主模块' }
  ],
  listen: [
    { value: '@setVisibleTrue', label: '显示' },
    { value: '@setVisibleFalse', label: '隐藏' },
    { value: 'setValue', label: '设置数据' },
  ],
  dispatch: [
    { value: '@onClick', label: 'click' },
    { value: '@onDoubleClick', label: 'double click' },
    { value: '@onMouseEnter', label: 'mouse enter' },
    { value: '@onMouseLeave', label: 'mouse leave'},
    { value: '@onMouseMove', label: 'mouse move' },
    { value: '@onMouseDown', label: 'mouse down' },
    { value: '@onMouseUp', label: 'mouse up' },
  ],
  style: {},
  property: {
    value: '#/',
    type: 'equal'
  }
}

export default information