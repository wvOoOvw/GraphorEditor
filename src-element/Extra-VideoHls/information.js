const information = {
  name: '视频Hls',
  type: 'Extra',
  children: false,
  monitor: [
    { value: '@setUseTrue', label: 'Use Element' },
    { value: '@setUseFalse', label: 'Unuse Element' },
    { value: 'setUrl', label: '设置视频地址' },
    { value: 'setPlay', label: '播放' },
    { value: 'setPause', label: '暂停' },
  ],
  trigger: [
    { value: '@onClick', label: 'Click' },
    { value: '@onDoubleClick', label: 'Double Click' },
    { value: '@onMouseEnter', label: 'Mouse Enter' },
    { value: '@onMouseLeave', label: 'Mouse Leave'},
    { value: '@onMouseMove', label: 'Mouse Move' },
    { value: '@onMouseDown', label: 'Mouse Down' },
    { value: '@onMouseUp', label: 'Mouse Up' },
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