const information = {
  name: '徽章',
  type: 'Material UI Component',
  children: [
    { value: 'main', label: '主模块' }
  ],
  listen: [
    { value: '@setVisibleTrue', label: '显示' },
    { value: '@setVisibleFalse', label: '隐藏' },
    { value: 'setContent', label: '设置内容' },
  ],
  dispatch: [
    { value: '@onClick', label: '点击' },
    { value: '@onDoubleClick', label: '双击' },
    { value: '@onMouseEnter', label: '移入' },
    { value: '@onMouseLeave', label: '移出'},
    { value: '@onMouseMove', label: '移动' },
    { value: '@onMouseDown', label: '按下' },
    { value: '@onMouseUp', label: '松开' },
  ],
  style: {
    $nonuse: ['transition', 'filter', 'border', 'borderRadius', 'boxShadow', 'outline', 'background', 'font', 'text', 'textDecoration', 'textShadow', 'textStroke', 'cursor']
  },
  property: {
    content: 0,
    color: 'primary',
    variant: 'standard',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
  }
}

export default information