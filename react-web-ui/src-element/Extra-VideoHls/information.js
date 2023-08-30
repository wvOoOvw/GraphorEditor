const information = {
  name: 'Video Hls',
  type: 'Extra',
  monitor: [
    { value: 'setUrl', label: 'Set Url' },
    { value: 'play', label: 'Play' },
    { value: 'pause', label: 'Pause' },
  ],
  trigger: [
    { value: 'onEnded', label: 'On Ended' },
  ],
  style: [
    {
      value: 'content',
      label: 'Content',
      rule: {
        $nonuse: ['font', 'text', 'textDecoration', 'textShadow', 'textStroke']
      }
    }
  ],
  property: {
    src: '',
    poster: '',
    controls: false,
    autoplay: false,
    loop: false,
  }
}

export default information