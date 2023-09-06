import Imitation from 'imitation-imm/src/index'

const ImitationINS = new Imitation()

ImitationINS.state = {}

const initState = () => {
  const state = {
    loading: 0,

    message: '',

    version: '1.0.0',

    navigationTabsValue: 'ElementShop',
    navigationTabsElementValue: undefined,

    elementHover: undefined,

    elementDragStart: undefined,
    elementDragEnter: undefined,

    eventMouseDownTarget: undefined,
    eventMouseDownPosition: undefined,

    graphDevRootRef: undefined,
    eventDevRootRef: undefined,

    graphContent: [],
    graphContentUpdate: undefined,

    graphEvent: [],
    graphEventUpdate: undefined,

    graphConfig: {
      screenGraph: {
        width: 375,
        height: 667,
        scale: 1,
        translateX: 0,
        translateY: 0
      },
      screenEvent: {
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
        updateId: '$update',
        sourceOrigin: 'https://github-magneto.github.io/project-graphor/build-package'
      }
    },
    graphConfigUpdate: undefined,

    graphElement: [],
    graphElementUpdate: undefined
  }

  Object.assign(ImitationINS.state, state)
}

initState()

export default ImitationINS

export { initState }