const information = {
  name: 'Table',
  type: 'Material UI Component',
  children: false,
  monitor: [
    { value: '@setUseTrue', label: 'Use Element' },
    { value: '@setUseFalse', label: 'Unuse Element' },
    { value: 'setBody', label: 'Set Body' },
    { value: 'setHead', label: 'Set Head' },
    { value: 'setPaginationSize', label: 'Set Pagination Size' },
    { value: 'setPaginationPage', label: 'Set Pagination Page' },
    { value: 'setSelectClear', label: 'Clear Select' },
  ],
  trigger: [
    { value: '@onClick', label: 'Click' },
    { value: '@onDoubleClick', label: 'Double Click' },
    { value: '@onMouseEnter', label: 'Mouse Enter' },
    { value: '@onMouseLeave', label: 'Mouse Leave'},
    { value: '@onMouseMove', label: 'Mouse Move' },
    { value: '@onMouseDown', label: 'Mouse Down' },
    { value: '@onMouseUp', label: 'Mouse Up' },
    { value: 'onClick', label: 'Click Row Item' },
    { value: 'onSelect', label: 'Select Change' },
    { value: 'onPaginationChange', label: 'Pagination Change' }
  ],
  style: {
    $nonuse: ['transition', 'filter', 'border', 'borderRadius', 'boxShadow', 'outline', 'background', 'font', 'text', 'textDecoration', 'textShadow', 'textStroke', 'cursor']
  },
  property: {
    size: 'medium',
    stickyHeader: false,
    componentPaper: true,
    head: [{ label: 'Name', value: 'name' }],
    body: [{ head: 'Jack' }],
    usePagination: false,
    paginationComponent: true,
    paginationSize: 10,
    paginationPage: 1,
    paginationJustifyContent: 'center',
    useAction: true,
    actionVariant: 'contained',
    actionColor: 'primary',
    actionTitle: 'Action',
    actionText: 'Check',
    useSelect: true,
    selectMultiple: true,
    selectChecked: []
  }
}

export default information