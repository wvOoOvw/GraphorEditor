const information = {
  name: 'Table',
  type: 'Material UI Component',
  monitor: [
    { value: 'setBody', label: 'Set Body' },
    { value: 'setHead', label: 'Set Head' },
    { value: 'setPaginationSize', label: 'Set Pagination Size' },
    { value: 'setPaginationPage', label: 'Set Pagination Page' },
    { value: 'setSelectClear', label: 'Clear Select' },
  ],
  trigger: [
    { value: 'onClickRowItem', label: 'On Click Row Item' },
    { value: 'onSelectChange', label: 'On Select Change' },
    { value: 'onPaginationChange', label: 'On Pagination Change' }
  ],
  property: {
    size: 'medium',
    stickyHeader: false,
    componentPaper: true,
    head: [{ label: 'Name', value: 'name' }, { label: 'Age', value: 'age' }],
    body: [{ name: 'Jack', age: '20' }, { name: 'Tom', age: '35' }],
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