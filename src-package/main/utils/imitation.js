import Imitation from 'imitation-imm/src/index'

const ImitationINS = new Imitation()

const initState = () => {
  return {
    version: '1.0.0',

    message: '',

    modalVisible: 'AddElement',
    modalContent: undefined,

    elementHover: undefined,

    graphContent: [],
    graphContentUpdate: undefined,

    graphConfig: {
      screen: {
        width: 375,
        height: 667,
        scale: 1,
        translateX: 0,
        translateY: 0
      },
      dependenciesMap: {
        // 'CssReset': 'https://unpkg.com/css-reset-and-normalize/css/reset-and-normalize.min.css',
        'React': 'https://unpkg.com/react@17.0.2/umd/react.production.min.js',
        'ReactDOM': 'https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js',
        'MaterialUI': 'https://unpkg.com/@mui/material@5.2.0/umd/material-ui.production.min.js',
        'Hls': 'https://unpkg.com/hls.js@1.1.5/dist/hls.min.js',
        'echarts': 'https://unpkg.com/echarts@5.3.2/dist/echarts.common.min.js'
      },
      document: {
        title: 'Graphor',
        icon: '',
        viewport: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      project: {
        renderId: '$render',
        updateId: '$update'
      }
    },
    graphConfigUpdate: undefined,

    graphElement: [],
    graphElementUpdate: undefined
  }
}

ImitationINS.state = initState()

export default ImitationINS

export { initState }