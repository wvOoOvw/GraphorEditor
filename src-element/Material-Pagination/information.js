const information = {
  name: '分页',
  type: 'Material UI Component',
  children: false,
  listen: [
    { value: '@setVisibleTrue', label: '显示' },
    { value: '@setVisibleFalse', label: '隐藏' },
    { value: 'setPage', label: '设置当前页码' },
    { value: 'setCount', label: '设置页码总数' },
  ],
  dispatch: [
    { value: '@onClick', label: 'click' },
    { value: '@onDoubleClick', label: 'double click' },
    { value: '@onMouseEnter', label: 'mouse enter' },
    { value: '@onMouseLeave', label: 'mouse leave'},
    { value: '@onMouseMove', label: 'mouse move' },
    { value: '@onMouseDown', label: 'mouse down' },
    { value: '@onMouseUp', label: 'mouse up' },
    { value: 'onChange', label: '内容变动' },
  ],
  style: {
    $nonuse: ['transition', 'filter', 'border', 'borderRadius', 'boxShadow', 'outline', 'background', 'font', 'text', 'textDecoration', 'textShadow', 'textStroke', 'cursor']
  },
  property: {
    page: 1,
    count: 10,
    variant: 'text',
    shape: 'circular',
    color: 'primary',
    size: 'medium'
  }
}

export default information