const translateNaN = r => isNaN(r) ? r : r + 'px'

const fix = (style) => {
  if (style.boxSizing) delete style.boxSizing
  if (style.font) {
    if (style.font.fontFamily === undefined || Array.isArray(style.font.fontFamily)) style.font.fontFamily = defaultStyle.font.fontFamily
  }
}

const caculateStyle = (style) => {
  if (!style) return

  // fix(style)

  const style_ = {}

  if (style.visibility !== undefined) style_.visibility = style.visibility
  if (style.display !== undefined) style_.display = style.display
  if (style.overflow !== undefined) style_.overflow = style.overflow
  if (style.verticalAlign !== undefined) style_.verticalAlign = style.verticalAlign
  if (style.position !== undefined) style_.position = style.position
  if (style.zIndex !== undefined) style_.zIndex = style.zIndex
  if (style.cursor !== undefined) style_.cursor = style.cursor

  if (style.width !== undefined) style_.width = translateNaN(style.width)
  if (style.height !== undefined) style_.height = translateNaN(style.height)
  if (style.minWidth !== undefined) style_.minWidth = translateNaN(style.minWidth)
  if (style.minHeight !== undefined) style_.minHeight = translateNaN(style.minHeight)
  if (style.maxWidth !== undefined) style_.maxWidth = translateNaN(style.maxWidth)
  if (style.maxHeight !== undefined) style_.maxHeight = translateNaN(style.maxHeight)

  if (style.padding !== undefined) {
    if (style.padding.includes('')) {
      if (style.padding[0]) style_.paddingTop = translateNaN(style.padding[0])
      if (style.padding[1]) style_.paddingRight = translateNaN(style.padding[1])
      if (style.padding[2]) style_.paddingBottom = translateNaN(style.padding[2])
      if (style.padding[3]) style_.paddingLeft = translateNaN(style.padding[3])
    } else {
      style_.padding = style.padding.map(i => translateNaN(i)).join(' ')
    }
  }
  if (style.margin !== undefined) {
    if (style.margin.includes('')) {
      if (style.margin[0]) style_.marginTop = translateNaN(style.margin[0])
      if (style.margin[1]) style_.marginRight = translateNaN(style.margin[1])
      if (style.margin[2]) style_.marginBottom = translateNaN(style.margin[2])
      if (style.margin[3]) style_.marginLeft = translateNaN(style.margin[3])
    } else {
      style_.margin = style.margin.map(i => translateNaN(i)).join(' ')
    }
  }
  if (style.inset !== undefined) {
    style_.top = style.inset[0] ? translateNaN(style.inset[0]) : 'auto'
    style_.right = style.inset[1] ? translateNaN(style.inset[1]) : 'auto'
    style_.bottom = style.inset[2] ? translateNaN(style.inset[2]) : 'auto'
    style_.left = style.inset[3] ? translateNaN(style.inset[3]) : 'auto'
  }

  if (style.flex) {
    style_.flexDirection = style.flex.flexDirection
    style_.flexWrap = style.flex.flexWrap
    style_.justifyContent = style.flex.justifyContent
    style_.alignItems = style.flex.alignItems
    style_.alignContent = style.flex.alignContent
    style_.flexGrow = style.flex.flexGrow
    style_.flexShrink = style.flex.flexShrink
    style_.flexBasis = style.flex.flexBasis
  }

  if (style.transform !== undefined) {
    style_.perspective = style.transform.perspective
    style_.transformStyle = style.transform.transformStyle
    style_.transformOrigin = style.transform.transformOrigin.map(i => translateNaN(i)).join(' ')
    style_.transform = `
        translateX(${translateNaN(style.transform.transformTranslate[0])})
        translateY(${translateNaN(style.transform.transformTranslate[1])})
        translateZ(${translateNaN(style.transform.transformTranslate[2])})
        rotateX(${style.transform.transformRotate[0]}deg)
        rotateY(${style.transform.transformRotate[1]}deg)
        rotateZ(${style.transform.transformRotate[2]}deg)
        scaleX(${style.transform.transformScale[0]})
        scaleY(${style.transform.transformScale[1]})
        scaleZ(${style.transform.transformScale[2]})
      `
  }

  if (style.transition !== undefined) {
    style_.transition = `${style.transition.transitionTime}s all`
  }

  if (style.filter !== undefined) {
    style_.filter = `blur(${style.filter.filterBlur}px) brightness(${style.filter.filterBrightness}%) opacity(${style.filter.filterOpacity}%)`
  }

  if (style.border !== undefined) {
    if (style.border.borderPosition.includes('top')) {
      Object.assign(style_, {
        borderTop: `${style.border.borderColor} ${style.border.borderStyle} ${style.border.borderWidth}px`
      })
    }
    if (style.border.borderPosition.includes('bottom')) {
      Object.assign(style_, {
        borderBottom: `${style.border.borderColor} ${style.border.borderStyle} ${style.border.borderWidth}px`
      })
    }
    if (style.border.borderPosition.includes('left')) {
      Object.assign(style_, {
        borderLeft: `${style.border.borderColor} ${style.border.borderStyle} ${style.border.borderWidth}px`
      })
    }
    if (style.border.borderPosition.includes('right')) {
      Object.assign(style_, {
        borderRight: `${style.border.borderColor} ${style.border.borderStyle} ${style.border.borderWidth}px`
      })
    }

  }

  if (style.borderRadius !== undefined) {
    Object.assign(style_, {
      borderRadius: `
        ${translateNaN(style.borderRadius[0])}
        ${translateNaN(style.borderRadius[1])}
        ${translateNaN(style.borderRadius[2])}
        ${translateNaN(style.borderRadius[3])}
      `
    })
  }

  if (style.boxShadow !== undefined) {
    Object.assign(style_, {
      boxShadow: `${style.boxShadow.boxShadowPosition[0]}px ${style.boxShadow.boxShadowPosition[1]}px ${style.boxShadow.boxShadowSize}px ${style.boxShadow.boxShadowColor} ${style.boxShadow.boxShadowInset ? 'inset' : ''}`
    })
  }

  if (style.outline !== undefined) {
    Object.assign(style_, {
      outline: `${style.outline.outlineColor} ${style.outline.outlineStyle} ${style.outline.outlineWidth}px`
    })
  }

  if (style.background !== undefined) {
    Object.assign(style_, {
      background: `
        ${style.background.backgroundColor} 
        ${style.background.backgroundPosition[0]}${style.background.backgroundPosition[1]}/${style.background.backgroundSize[0]}${style.background.backgroundSize[1]} 
        ${style.background.backgroundRepeat} 
        ${style.background.backgroundAttachment} 
        ${style.background.backgroundImage ? `url(${style.background.backgroundImage})` : 'none'}
      `
    })
  }

  if (style.font !== undefined) {
    if (style.font.fontSize) style_.fontSize = style.font.fontSize + 'px'
    if (style.font.fontWeight) style_.fontWeight = style.font.fontWeight
    if (style.font.fontFamily) style_.fontFamily = style.font.fontFamily
  }

  if (style.text !== undefined) {
    if (style.text.lineHeight) style_.lineHeight = style.text.lineHeight
    if (style.text.letterSpacing) style_.letterSpacing = style.text.letterSpacing + 'px'
    if (style.text.textAlign) style_.textAlign = style.text.textAlign
    if (style.text.whiteSpace) style_.whiteSpace = style.text.whiteSpace
    if (style.text.color) style_.color = style.text.color
  }

  if (style.textDecoration !== undefined) {
    Object.assign(style_, {
      textDecoration: `${style.textDecoration.textDecorationColor} ${style.textDecoration.textDecorationLine} ${style.textDecoration.textDecorationStyle}`
    })
  }

  if (style.textShadow !== undefined) {
    Object.assign(style_, {
      textShadow: `${style.textShadow.textShadowPosition[0]}px ${style.textShadow.textShadowPosition[1]}px ${style.textShadow.textShadowSize}px ${style.textShadow.textShadowColor}`
    })
  }

  if (style.textStroke !== undefined) {
    Object.assign(style_, {
      textStroke: `${style.textStroke.textStrokeWidth}px ${style.textStroke.textStrokeColor}`,
      webkitTextStroke: `${style.textStroke.textStrokeWidth}px ${style.textStroke.textStrokeColor}`
    })
  }

  return style_
}

const defaultStyle = {
  visibility: 'visible',

  display: 'block',
  overflow: 'visible',
  verticalAlign: 'baseline',
  position: 'static',
  cursor: 'default',
  zIndex: 1,

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

export { caculateStyle, defaultStyle }