const information = {
  name: '拖动容器',
  type: 'Box',
  children: [
    { value: 'main', label: '主模块' }
  ],
  monitor: [
    { value: '@setVisibleTrue', label: '显示' },
    { value: '@setVisibleFalse', label: '隐藏' },
  ],
  trigger: [
    { value: '@onClick', label: 'Click' },
    { value: '@onDoubleClick', label: 'Double Click' },
    { value: '@onMouseEnter', label: 'Mouse Enter' },
    { value: '@onMouseLeave', label: 'Mouse Leave'},
    { value: '@onMouseMove', label: 'Mouse Move' },
    { value: '@onMouseDown', label: 'Mouse Down' },
    { value: '@onMouseUp', label: 'Mouse Up' },
    { value: 'onDrag', label: '拖动时' },
    { value: 'onDragStart', label: '拖动开始' },
    { value: 'onDragLeave', label: '拖动结束' },
    { value: 'onDragOver', label: '拖动物悬浮' },
    { value: 'onDragEnter', label: '拖动物移入' },
    { value: 'onDragEnd', label: '拖动物移出' },
    { value: 'onDrop', label: '拖动物放置' },
  ],
  style: {},
  property: {
    draggable: true,
  }
}

export default information