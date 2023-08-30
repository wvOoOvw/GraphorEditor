const information = {
  name: 'Iframe',
  type: 'Basic',
  monitor: [
    { value: 'setUrl', label: 'Set Url' },
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
  }
}

export default information