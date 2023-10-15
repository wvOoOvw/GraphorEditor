const information = {
  name: 'Dialog',
  type: 'Material UI Component',
  children: [
    { value: 'dialogContent', label: 'Dialog Content' },
    { value: 'dialogTitle', label: 'Dialog Title' },
    { value: 'dialogAction', label: 'Dialog Action' }
  ],
  monitor: [
    { value: 'openDialog', label: 'Open Dialog' },
    { value: 'closeDialog', label: 'Close Dialog' },
  ],
  trigger: [
    { value: 'onOpen', label: 'On Open' },
    { value: 'onClose', label: 'On Close' },
  ],
  property: {
    open: true,
    dividers: true,
    enableClose: true,
  }
}

export default information