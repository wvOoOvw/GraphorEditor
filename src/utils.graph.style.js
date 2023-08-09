const translateNaN = r => isNaN(r) ? r : r + 'px'

const fix = (outer) => {
  if (outer.boxSizing) delete outer.boxSizing
  if (outer.font) {
    if (outer.font.fontFamily === undefined || Array.isArray(outer.font.fontFamily)) outer.font.fontFamily = defaultOuterAll.font.fontFamily
  }
}

const graphOuterStyle = (outer) => {
  if (!outer) return

  // fix(outer)

  const style = {}

  if (outer.display !== undefined) style.display = outer.display
  if (outer.overflow !== undefined) style.overflow = outer.overflow
  if (outer.verticalAlign !== undefined) style.verticalAlign = outer.verticalAlign
  if (outer.position !== undefined) style.position = outer.position
  if (outer.zIndex !== undefined) style.zIndex = outer.zIndex
  if (outer.cursor !== undefined) style.cursor = outer.cursor

  if (outer.visible !== undefined) style.display = outer.visible ? style.display : 'none'

  if (outer.width !== undefined) style.width = translateNaN(outer.width)
  if (outer.height !== undefined) style.height = translateNaN(outer.height)
  if (outer.minWidth !== undefined) style.minWidth = translateNaN(outer.minWidth)
  if (outer.minHeight !== undefined) style.minHeight = translateNaN(outer.minHeight)
  if (outer.maxWidth !== undefined) style.maxWidth = translateNaN(outer.maxWidth)
  if (outer.maxHeight !== undefined) style.maxHeight = translateNaN(outer.maxHeight)

  if (outer.padding !== undefined) {
    if (outer.padding.includes('')) {
      if (outer.padding[0]) style.paddingTop = translateNaN(outer.padding[0])
      if (outer.padding[1]) style.paddingRight = translateNaN(outer.padding[1])
      if (outer.padding[2]) style.paddingBottom = translateNaN(outer.padding[2])
      if (outer.padding[3]) style.paddingLeft = translateNaN(outer.padding[3])
    } else {
      style.padding = outer.padding.map(i => translateNaN(i)).join(' ')
    }
  }
  if (outer.margin !== undefined) {
    if (outer.margin.includes('')) {
      if (outer.margin[0]) style.marginTop = translateNaN(outer.margin[0])
      if (outer.margin[1]) style.marginRight = translateNaN(outer.margin[1])
      if (outer.margin[2]) style.marginBottom = translateNaN(outer.margin[2])
      if (outer.margin[3]) style.marginLeft = translateNaN(outer.margin[3])
    } else {
      style.margin = outer.margin.map(i => translateNaN(i)).join(' ')
    }
  }
  if (outer.inset !== undefined) {
    style.top = outer.inset[0] ? translateNaN(outer.inset[0]) : 'auto'
    style.right = outer.inset[1] ? translateNaN(outer.inset[1]) : 'auto'
    style.bottom = outer.inset[2] ? translateNaN(outer.inset[2]) : 'auto'
    style.left = outer.inset[3] ? translateNaN(outer.inset[3]) : 'auto'
  }

  if (outer.flex) {
    Object.assign(style, {
      flexDirection: outer.flex.flexDirection,
      flexWrap: outer.flex.flexWrap,
      justifyContent: outer.flex.justifyContent,
      alignItems: outer.flex.alignItems,
      alignContent: outer.flex.alignContent,
      flexGrow: outer.flex.flexGrow,
      flexShrink: outer.flex.flexShrink,
      flexBasis: outer.flex.flexBasis,
    })
  }

  if (outer.transform !== undefined) {
    Object.assign(style, {
      perspective: outer.transform.perspective,
      transformStyle: outer.transform.transformStyle,
      transformOrigin: outer.transform.transformOrigin.map(i => translateNaN(i)).join(' '),
      transform: `
        translateX(${translateNaN(outer.transform.transformTranslate[0])})
        translateY(${translateNaN(outer.transform.transformTranslate[1])})
        translateZ(${translateNaN(outer.transform.transformTranslate[2])})
        rotateX(${outer.transform.transformRotate[0]}deg)
        rotateY(${outer.transform.transformRotate[1]}deg)
        rotateZ(${outer.transform.transformRotate[2]}deg)
        scaleX(${outer.transform.transformScale[0]})
        scaleY(${outer.transform.transformScale[1]})
        scaleZ(${outer.transform.transformScale[2]})
      `
    })
  }

  if (outer.transition !== undefined) {
    Object.assign(style, {
      transition: `${outer.transition.transitionTime}s all`
    })
  }

  if (outer.filter !== undefined) {
    Object.assign(style, {
      filter: `blur(${outer.filter.filterBlur}px) brightness(${outer.filter.filterBrightness}%) opacity(${outer.filter.filterOpacity}%)`
    })
  }

  if (outer.border !== undefined) {
    if (outer.border.borderPosition.includes('top')) {
      Object.assign(style, {
        borderTop: `${outer.border.borderColor} ${outer.border.borderStyle} ${outer.border.borderWidth}px`
      })
    }
    if (outer.border.borderPosition.includes('bottom')) {
      Object.assign(style, {
        borderBottom: `${outer.border.borderColor} ${outer.border.borderStyle} ${outer.border.borderWidth}px`
      })
    }
    if (outer.border.borderPosition.includes('left')) {
      Object.assign(style, {
        borderLeft: `${outer.border.borderColor} ${outer.border.borderStyle} ${outer.border.borderWidth}px`
      })
    }
    if (outer.border.borderPosition.includes('right')) {
      Object.assign(style, {
        borderRight: `${outer.border.borderColor} ${outer.border.borderStyle} ${outer.border.borderWidth}px`
      })
    }

  }

  if (outer.borderRadius !== undefined) {
    Object.assign(style, {
      borderRadius: `
        ${translateNaN(outer.borderRadius[0])}
        ${translateNaN(outer.borderRadius[1])}
        ${translateNaN(outer.borderRadius[2])}
        ${translateNaN(outer.borderRadius[3])}
      `
    })
  }

  if (outer.boxShadow !== undefined) {
    Object.assign(style, {
      boxShadow: `${outer.boxShadow.boxShadowPosition[0]}px ${outer.boxShadow.boxShadowPosition[1]}px ${outer.boxShadow.boxShadowSize}px ${outer.boxShadow.boxShadowColor} ${outer.boxShadow.boxShadowInset ? 'inset' : ''}`
    })
  }

  if (outer.outline !== undefined) {
    Object.assign(style, {
      outline: `${outer.outline.outlineColor} ${outer.outline.outlineStyle} ${outer.outline.outlineWidth}px`
    })
  }

  if (outer.background !== undefined) {
    Object.assign(style, {
      background: `
        ${outer.background.backgroundColor} 
        ${outer.background.backgroundPosition[0]}${outer.background.backgroundPosition[1]}/${outer.background.backgroundSize[0]}${outer.background.backgroundSize[1]} 
        ${outer.background.backgroundRepeat} 
        ${outer.background.backgroundAttachment} 
        ${outer.background.backgroundImage ? `url(${outer.background.backgroundImage})` : 'none'}
      `
    })
  }

  if (outer.font !== undefined) {
    if (outer.font.fontSize) style.fontSize = outer.font.fontSize + 'px'
    if (outer.font.fontWeight) style.fontWeight = outer.font.fontWeight
    if (outer.font.fontFamily) style.fontFamily = outer.font.fontFamily
  }

  if (outer.text !== undefined) {
    if (outer.text.lineHeight) style.lineHeight = outer.text.lineHeight
    if (outer.text.letterSpacing) style.letterSpacing = outer.text.letterSpacing + 'px'
    if (outer.text.textAlign) style.textAlign = outer.text.textAlign
    if (outer.text.whiteSpace) style.whiteSpace = outer.text.whiteSpace
    if (outer.text.color) style.color = outer.text.color
  }

  if (outer.textDecoration !== undefined) {
    Object.assign(style, {
      textDecoration: `${outer.textDecoration.textDecorationColor} ${outer.textDecoration.textDecorationLine} ${outer.textDecoration.textDecorationStyle}`
    })
  }

  if (outer.textShadow !== undefined) {
    Object.assign(style, {
      textShadow: `${outer.textShadow.textShadowPosition[0]}px ${outer.textShadow.textShadowPosition[1]}px ${outer.textShadow.textShadowSize}px ${outer.textShadow.textShadowColor}`
    })
  }

  if (outer.textStroke !== undefined) {
    Object.assign(style, {
      textStroke: `${outer.textStroke.textStrokeWidth}px ${outer.textStroke.textStrokeColor}`,
      webkitTextStroke: `${outer.textStroke.textStrokeWidth}px ${outer.textStroke.textStrokeColor}`
    })
  }

  return style
}

const defaultOuterAll = {
  render: true,
  visible: true,

  display: 'block',
  overflow: 'visible',
  verticalAlign: 'baseline',
  position: 'static',
  cursor: 'default',
  zIndex: '1',

  padding: ['', '', '', ''],
  margin: ['', '', '', ''],
  inset: ['', '', '', ''],

  width: '',
  height: '',
  minWidth: '',
  minHeight: '',
  maxWidth: '',
  maxHeight: '',

  flex: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },

  transform: {
    perspective: 1000,
    transformStyle: 'flat',
    transformOrigin: ['50%', '50%', '0'],
    transformTranslate: [0, 0, 0],
    transformRotate: [0, 0, 0],
    transformScale: [1, 1, 1],
  },

  transition: {
    transitionTime: 0.5,
  },

  filter: {
    filterBlur: 0,
    filterBrightness: 100,
    filterOpacity: 100,
  },

  border: {
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
    borderPosition: ['top', 'bottom', 'left', 'right']
  },

  borderRadius: [12, 12, 12, 12],

  boxShadow: {
    boxShadowPosition: [0, 0],
    boxShadowSize: 4,
    boxShadowColor: '#000000',
    boxShadowInset: false,
  },

  outline: {
    outlineWidth: 1,
    outlineColor: '#000000',
    outlineStyle: 'solid',
  },

  background: {
    backgroundColor: '#000000',
    backgroundImage: '',
    backgroundPosition: ['50%', '50%'],
    backgroundSize: ['100%', '100%'],
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
  },

  font: {
    fontSize: 16,
    fontWeight: 400,
    fontFamily: ''
  },

  text: {
    lineHeight: 1.5,
    letterSpacing: 0,
    textAlign: 'left',
    whiteSpace: 'normal',
    color: '#000000',
  },

  textDecoration: {
    textDecorationColor: '#000000',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },

  textShadow: {
    textShadowPosition: [0, 0],
    textShadowSize: 4,
    textShadowColor: '#000000',
  },

  textStroke: {
    textStrokeWidth: 1,
    textStrokeColor: '#000000',
  }
}

const defaultOuterAdd = {
  render: true,
  visible: true,
}

export { graphOuterStyle, defaultOuterAll, defaultOuterAdd }