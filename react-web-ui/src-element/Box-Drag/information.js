const information = {
  name: 'Box Drag',
  type: 'Box',
  children: [
    { value: 'main', label: 'Main' }
  ],
  monitor: [],
  trigger: [
    { value: 'onDrag', label: 'Drag Move' },
    { value: 'onDragStart', label: 'Drag Start' },
    { value: 'onDragEnd', label: 'Drag End' },
    { value: 'onDragEnter', label: 'Drag Enter' },
    { value: 'onDragLeave', label: 'Drag Leave' },
    { value: 'onDragOver', label: 'Drag Over' },
    { value: 'onDrop', label: 'Drop' },
  ],
  style: [
    { value: 'main', label: 'Main' }
  ],
  property: {
    draggable: true,
  }
}

export default information