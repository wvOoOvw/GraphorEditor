const information = {
  name: '表格',
  type: 'Material UI Component',
  children: false,
  listen: [
    { value: '@setVisibleTrue', label: '显示' },
    { value: '@setVisibleFalse', label: '隐藏' },
    { value: 'setBody', label: '设置表格内容' },
    { value: 'setHead', label: '设置表格栏' },
    { value: 'setPaginationSize', label: '设置单页数量' },
    { value: 'setPaginationPage', label: '设置当前页码' },
    { value: 'setSelectClear', label: '清空选择框' },
  ],
  dispatch: [
    { value: '@onClick', label: '点击' },
    { value: '@onDoubleClick', label: '双击' },
    { value: '@onMouseEnter', label: '移入' },
    { value: '@onMouseLeave', label: '移出'},
    { value: '@onMouseMove', label: '移动' },
    { value: '@onMouseDown', label: '按下' },
    { value: '@onMouseUp', label: '松开' },
    { value: 'onClick', label: '表格项点击' },
    { value: 'onSelect', label: '选择框变动' },
    { value: 'onPaginationChange', label: '分页栏变动' }
  ],
  style: {
    $nonuse: ['transition', 'filter', 'border', 'borderRadius', 'boxShadow', 'outline', 'background', 'font', 'text', 'textDecoration', 'textShadow', 'textStroke', 'cursor']
  },
  property: {
    size: 'medium',
    stickyHeader: false,
    componentPaper: true,
    head: [{ label: '表格头', value: 'head' }],
    body: [{ head: '表格数据' }],
    usePagination: false,
    paginationComponent: true,
    paginationSize: 10,
    paginationPage: 1,
    paginationJustifyContent: 'center',
    useAction: true,
    actionVariant: 'contained',
    actionColor: 'primary',
    actionTitle: '操作',
    actionText: '查看',
    useSelect: true,
    selectMultiple: true,
    selectChecked: []
  }
}

export default information