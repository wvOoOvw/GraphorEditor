const information = {
  name: 'Box Drag',
  type: 'Box',
  children: [
    { value: 'main', label: 'Main' }
  ],
  monitor: [
    { value: '@setUseTrue', label: 'Use Element' },
    { value: '@setUseFalse', label: 'Unuse Element' },
  ],
  trigger: [
    { value: '@onClick', label: 'Click' },
    { value: '@onDoubleClick', label: 'Double Click' },
    { value: '@onMouseEnter', label: 'Mouse Enter' },
    { value: '@onMouseLeave', label: 'Mouse Leave'},
    { value: '@onMouseMove', label: 'Mouse Move' },
    { value: '@onMouseDown', label: 'Mouse Down' },
    { value: '@onMouseUp', label: 'Mouse Up' },
    { value: 'onDrag', label: 'Drag Move' },
    { value: 'onDragStart', label: 'Drag Start' },
    { value: 'onDragEnd', label: 'Drag End' },
    { value: 'onDragEnter', label: 'Drag Enter' },
    { value: 'onDragLeave', label: 'Drag Leave' },
    { value: 'onDragOver', label: 'Drag Over' },
    { value: 'onDrop', label: 'Drop' },
  ],
  style: {},
  property: {
    draggable: true,
  }
}

export default information