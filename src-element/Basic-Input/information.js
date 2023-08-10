const information = {
  name: '输入框',
  type: 'Basic',
  children: false,
  listen: [
    { value: '@setVisibleTrue', label: '显示' },
    { value: '@setVisibleFalse', label: '隐藏' },
    { value: 'setValue', label: '设置内容' },
    { value: 'setValueEmpty', label: '清空内容' }
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
    { value: 'onFocus', label: '聚焦' },
    { value: 'onBlur', label: '失焦' }
  ],
  style: {},
  property: {
    value: '内容',
    placeholder: '',
    type: 'text',
    disabled: false,
    fileMultiple: false,
    fileAccept: '*'
  }
}

export default information