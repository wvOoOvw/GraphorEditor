const information = {
  name: '菜单',
  type: 'Material UI Component',
  children: false,
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
    { value: 'onClick', label: '单项点击' },
  ],
  style: {
    $nonuse: ['transition', 'filter', 'border', 'borderRadius', 'boxShadow', 'outline', 'background', 'font', 'text', 'textDecoration', 'textShadow', 'textStroke', 'cursor']
  },
  property: {
    options: [{ label: '菜单', value: 'option' }],
  }
}

export default information