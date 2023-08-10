const information = {
  name: '视频Hls',
  type: 'Extra',
  children: false,
  listen: [
    { value: '@setVisibleTrue', label: '显示' },
    { value: '@setVisibleFalse', label: '隐藏' },
    { value: 'setUrl', label: '设置视频地址' },
    { value: 'setPlay', label: '播放' },
    { value: 'setPause', label: '暂停' },
  ],
  dispatch: [
    { value: '@onClick', label: 'click' },
    { value: '@onDoubleClick', label: 'double click' },
    { value: '@onMouseEnter', label: 'mouse enter' },
    { value: '@onMouseLeave', label: 'mouse leave'},
    { value: '@onMouseMove', label: 'mouse move' },
    { value: '@onMouseDown', label: 'mouse down' },
    { value: '@onMouseUp', label: 'mouse up' },
    { value: 'onEnded', label: '播放结束' },
  ],
  style: {
    $nonuse: ['font', 'text', 'textDecoration', 'textShadow', 'textStroke']
  },
  property: {
    src: '',
    poster: '',
    controls: false,
    autoplay: false,
    loop: false,
  }
}

export default information