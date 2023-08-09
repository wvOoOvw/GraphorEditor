const information = {
  name: '输入框',
  type: 'Material UI Component',
  children: false,
  listen: [
    { value: '@setVisibleTrue', label: '显示' },
    { value: '@setVisibleFalse', label: '隐藏' },
    { value: 'setValue', label: '设置内容' },
    { value: 'setValueEmpty', label: '清空内容' },
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
    { value: 'onFocus', label: '聚焦' },
    { value: 'onBlur', label: '失焦' }
  ],
  style: {
    $nonuse: ['transition', 'filter', 'border', 'borderRadius', 'boxShadow', 'outline', 'background', 'font', 'text', 'textDecoration', 'textShadow', 'textStroke', 'cursor']
  },
  property: {
    type: 'text',
    value: '',
    variant: 'outlined',
    color: 'primary',
    label: '输入',
    size: 'medium',
    disabled: false
  }
}

export default information