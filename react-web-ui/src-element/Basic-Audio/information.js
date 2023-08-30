const information = {
  name: 'Audio',
  type: 'Basic',
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
      value: 'main',
      label: 'Main',
      rule: {
        $nonuse: ['font', 'text', 'textDecoration', 'textShadow', 'textStroke']
      }
    }
  ],
  property: {
    src: '',
    controls: false,
    autoplay: false,
    loop: false,
  }
}

export default information