const information = {
  name: '滑动条',
  type: 'Material UI Component',
  children: false,
  listen: [
    { value: '@setVisibleTrue', label: '显示' },
    { value: '@setVisibleFalse', label: '隐藏' },
    { value: 'setValue', label: '设置内容' }
  ],
  dispatch: [
    { value: '@onClick', label: '点击' },
    { value: '@onDoubleClick', label: '双击' },
    { value: '@onMouseEnter', label: '移入' },
    { value: '@onMouseLeave', label: '移出'},
    { value: '@onMouseMove', label: '移动' },
    { value: '@onMouseDown', label: '按下' },
    { value: '@onMouseUp', label: '松开' },
    { value: 'onChange', label: '内容变动' },
  ],
  outer: {
    $nonuse: ['transition', 'filter', 'border', 'borderRadius', 'boxShadow', 'outline', 'background', 'font', 'text', 'textDecoration', 'textShadow', 'textStroke', 'cursor']
  },
  inner: {
    color: 'primary',
    size: 'medium',
    checked: false,
    value: 70,
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    valueLabelDisplay: 'auto'
  }
}

export default information