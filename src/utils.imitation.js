import Imitation from 'imitation-imm/src/index'

const ImitationINS = new Imitation()

ImitationINS.state = {
  loading: 0,

  message: '',

  version: '1.0.0',

  navigationTabsValue: 'AddElement',
  navigationTabsElementConfigValue: undefined,

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
      'MaterialUI': 'https://unpkg.com/@mui/material@5.14.3/umd/material-ui.production.min.js',
      'Hls': 'https://unpkg.com/hls.js@1.1.5/dist/hls.min.js',
      'echarts': 'https://unpkg.com/echarts@5.4.1/dist/echarts.common.min.js'
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

const initState = () => {
  const state = {
    navigationTabsValue: 'AddElement',
    navigationTabsElementConfigValue: undefined,

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
        'MaterialUI': 'https://unpkg.com/@mui/material@5.14.3/umd/material-ui.production.min.js',
        'Hls': 'https://unpkg.com/hls.js@1.1.5/dist/hls.min.js',
        'echarts': 'https://unpkg.com/echarts@5.4.1/dist/echarts.common.min.js'
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

  Object.assign(ImitationINS.state, state)
}

export default ImitationINS

export { initState }