const information = {
  name: '拖动容器',
  type: '容器',
  children: [
    { value: 'main', label: '主模块' }
  ],
  listen: [
    { value: '@setVisibleTrue', label: '显示' },
    { value: '@setVisibleFalse', label: '隐藏' },
  ],
  dispatch: [
    { value: '@onClick', label: '点击' },
    { value: '@onDoubleClick', label: '双击' },
    { value: '@onMouseEnter', label: '移入' },
    { value: '@onMouseLeave', label: '移出'},
    { value: '@onMouseMove', label: '移动' },
    { value: '@onMouseDown', label: '按下' },
    { value: '@onMouseUp', label: '松开' },
    { value: 'onDrag', label: '拖动时' },
    { value: 'onDragStart', label: '拖动开始' },
    { value: 'onDragLeave', label: '拖动结束' },
    { value: 'onDragOver', label: '拖动物悬浮' },
    { value: 'onDragEnter', label: '拖动物移入' },
    { value: 'onDragEnd', label: '拖动物移出' },
    { value: 'onDrop', label: '拖动物放置' },
  ],
  outer: {},
  inner: {
    draggable: true,
  }
}

export default information