const information = {
  name: '视频Hls',
  type: '扩展',
  children: false,
  listen: [
    { value: '@setVisibleTrue', label: '显示' },
    { value: '@setVisibleFalse', label: '隐藏' },
    { value: 'setUrl', label: '设置视频地址' },
    { value: 'setPlay', label: '播放' },
    { value: 'setPause', label: '暂停' },
  ],
  dispatch: [
    { value: '@onClick', label: '点击' },
    { value: '@onDoubleClick', label: '双击' },
    { value: '@onMouseEnter', label: '移入' },
    { value: '@onMouseLeave', label: '移出'},
    { value: '@onMouseMove', label: '移动' },
    { value: '@onMouseDown', label: '按下' },
    { value: '@onMouseUp', label: '松开' },
    { value: 'onEnded', label: '播放结束' },
  ],
  outer: {
    $nonuse: ['font', 'text', 'textDecoration', 'textShadow', 'textStroke']
  },
  inner: {
    src: '',
    poster: '',
    controls: false,
    autoplay: false,
    loop: false,
  }
}

export default information