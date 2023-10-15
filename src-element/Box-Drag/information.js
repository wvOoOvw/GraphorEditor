const information = {
  name: 'Box Drag',
  type: 'Box',
  children: [
    { value: 'content', label: 'Content' }
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
    { value: 'content', label: 'Content' }
  ],
  property: {
    draggable: true,
  }
}

export default information