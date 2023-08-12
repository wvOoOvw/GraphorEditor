const information = {
  name: 'Audio',
  type: 'Basic',
  children: false,
  listen: [
    { value: '@setVisibleTrue', label: 'Show' },
    { value: '@setVisibleFalse', label: 'Hidden' },
    { value: 'setUrl', label: 'Set Url' },
    { value: 'setPlay', label: 'Play' },
    { value: 'setPause', label: 'Pause' },
  ],
  dispatch: [
    { value: '@onClick', label: 'Click' },
    { value: '@onDoubleClick', label: 'Double Click' },
    { value: '@onMouseEnter', label: 'Mouse Enter' },
    { value: '@onMouseLeave', label: 'Mouse Leave'},
    { value: '@onMouseMove', label: 'Mouse Move' },
    { value: '@onMouseDown', label: 'Mouse Down' },
    { value: '@onMouseUp', label: 'Mouse Up' },
    { value: 'onEnded', label: 'Play Ended' },
  ],
  style: {
    $nonuse: ['font', 'text', 'textDecoration', 'textShadow', 'textStroke']
  },
  property: {
    src: '',
    controls: false,
    autoplay: false,
    loop: false,
  }
}

export default information