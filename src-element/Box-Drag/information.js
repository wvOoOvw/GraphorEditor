const information = {
  name: '拖动容器',
  type: 'Box',
  children: [
    { value: 'main', label: '主模块' }
  ],
  listen: [
    { value: '@setVisibleTrue', label: '显示' },
    { value: '@setVisibleFalse', label: '隐藏' },
  ],
  dispatch: [
    { value: '@onClick', label: 'click' },
    { value: '@onDoubleClick', label: 'double click' },
    { value: '@onMouseEnter', label: 'mouse enter' },
    { value: '@onMouseLeave', label: 'mouse leave'},
    { value: '@onMouseMove', label: 'mouse move' },
    { value: '@onMouseDown', label: 'mouse down' },
    { value: '@onMouseUp', label: 'mouse up' },
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