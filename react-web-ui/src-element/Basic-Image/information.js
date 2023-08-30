const information = {
  name: 'Image',
  type: 'Basic',
  monitor: [
    { value: 'setSrc', label: 'Set Src' },
  ],
  trigger: [],
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
    alt: ''
  }
}

export default information