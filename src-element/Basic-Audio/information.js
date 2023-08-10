const information = {
  name: 'Audio',
  type: 'Basic',
  children: false,
  listen: [
    { value: '@setVisibleTrue', label: 'show' },
    { value: '@setVisibleFalse', label: 'hidden' },
    { value: 'setUrl', label: 'set url' },
    { value: 'setPlay', label: 'play' },
    { value: 'setPause', label: 'pause' },
  ],
  dispatch: [
    { value: '@onClick', label: 'click' },
    { value: '@onDoubleClick', label: 'double click' },
    { value: '@onMouseEnter', label: 'mouse enter' },
    { value: '@onMouseLeave', label: 'mouse leave'},
    { value: '@onMouseMove', label: 'mouse move' },
    { value: '@onMouseDown', label: 'mouse down' },
    { value: '@onMouseUp', label: 'mouse up' },
    { value: 'onEnded', label: 'play ended' },
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