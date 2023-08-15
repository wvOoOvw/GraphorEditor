import React from 'react'

import { Paper } from '@mui/material'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import Imitation from './utils.imitation'
import { hash } from './utils.common'
import { caculateStyle } from './utils.graph.style'
import { graphElementSearch } from './utils.graph.common'

const nodeOffset = node => {
  const parentNodes = []

  var cache = node

  while (cache.parentNode && (cache.parentNode.id !== 'screen')) {
    if (['fixed', 'absolute', 'relative'].includes(cache.parentNode?.style?.position) || cache.parentNode?.style?.transform) {
      parentNodes.push(cache.parentNode)
    }
    cache = cache.parentNode
  }

  const r = {
    offsetWidth: node.offsetWidth,
    offsetHeight: node.offsetHeight,
    offsetTop: node.offsetTop,
    offsetLeft: node.offsetLeft,
  }

  if ([node.offsetWidth, node.offsetHeight, node.offsetTop, node.offsetLeft].includes(undefined)) {
    return null
  }

  parentNodes.forEach(i => {
    r.offsetTop = r.offsetTop + i.offsetTop
    r.offsetLeft = r.offsetLeft + i.offsetLeft
  })

  return r
}

function Hover() {
  const [hoverPosition, setHoverPosition] = React.useState([])

  const handle = () => {
    const hover = document.querySelector('[data-hover=hover]')
    const active = document.querySelector('[data-hover=active]')
    const r = [hover, active].map(i => {
      return i ? nodeOffset(i) : null
    })
    setHoverPosition(r)
  }

  React.useEffect(() => {
    handle()
    setTimeout(() => handle(), 500)
  }, [Imitation.state.navigationTabsElementValue, Imitation.state.elementHover, Imitation.state.graphContentUpdate])

  const style = (i) => {
    const size = 28
    const r = {
      transition: '0.5s all',
      width: size,
      height: size,
      position: 'absolute',
      zIndex: 99999,
      top: i.offsetTop + i.offsetHeight,
      left: i.offsetWidth / 2 + i.offsetLeft - size / 2,
    }
    return r
  }

  return hoverPosition.map((i, index) => i ? <div style={style(i)} className='element-hover' key={index}><KeyboardArrowUpIcon style={{ width: '100%', height: '100%', color: index === 1 ? 'rgb(25, 118, 210)' : 'black' }} /> </div> : null)
}

function ElementRender(props) {
  const { license, id, use, property, style, children } = props.element

  const { Render } = React.useMemo(() => graphElementSearch(license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!Render) {
    console.warn(license)
    Imitation.assignState({ message: 'Element Error' })
    return null
  }

  const [, setUpdate] = React.useState(0)
  const update = () => setUpdate(pre => pre + 1)

  const onMouseDown = e => {
    e.stopPropagation()
    e.preventDefault()
  }
  const onMouseUp = e => {
    e.stopPropagation()
    e.preventDefault()
  }
  const onMouseOver = e => {
    Imitation.assignState({ elementHover: id })
    e.stopPropagation()
  }
  const onMouseOut = e => {
    Imitation.assignState({ elementHover: undefined })
    e.stopPropagation()
  }
  const onClick = e => {
    Imitation.assignState({ navigationTabsElementValue: id, navigationTabsValue: 'ElementConfig' })
    e.stopPropagation()
    e.preventDefault()
  }

  const children_exe = React.useMemo(() => {
    if (!children) return
    const r = {}
    Object.entries(children).forEach(i => {
      r[i[0]] = () => i[1].map(i => <ElementRender key={i.id} element={i} />)
    })
    return r
  })

  const event = { onClick, onMouseDown, onMouseUp, onMouseOver, onMouseOut }

  const style_exe = {
    style: { ...caculateStyle(style), cursor: 'pointer', boxSizing: 'border-box' }
  }

  if (Imitation.state.elementHover === id) {
    style_exe['data-hover'] = 'hover'
  }

  if (Imitation.state.navigationTabsElementValue === id) {
    style_exe['data-hover'] = 'active'
  }

  const Render_exe = <Render
    event={event}
    style={style_exe}
    property={property}
    children={children_exe}
    env={'dev'}
    update={update}
    id={id}
  />

  if (use === false) return null

  return Render_exe
}

function App() {
  const [mouseDown, setMouseDown] = React.useState(false)
  const mouseDownPosition = React.useRef(null)
  const eventDown = e => {
    try {
      mouseDownPosition.current = [e.pageX || e.targetTouches[0].pageX, e.pageY || e.targetTouches[0].pageY]
      setMouseDown(true)
    } catch { }
  }
  const eventUp = e => {
    mouseDownPosition.current = null
    setMouseDown(false)
  }
  const eventMove = e => {
    if (!mouseDownPosition.current) return
    const changeX = (e.pageX || e.targetTouches[0].pageX) - mouseDownPosition.current[0]
    const changeY = (e.pageY || e.targetTouches[0].pageY) - mouseDownPosition.current[1]
    mouseDownPosition.current = [mouseDownPosition.current[0] + changeX, mouseDownPosition.current[1] + changeY]
    Imitation.state.graphConfig.screen.translateX = Math.floor(Number(Imitation.state.graphConfig.screen.translateX) + changeX)
    Imitation.state.graphConfig.screen.translateY = Math.floor(Number(Imitation.state.graphConfig.screen.translateY) + changeY)
    Imitation.assignState({ graphConfigUpdate: hash() })
  }

  return <Paper
    style={{
      height: '100%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      flexGrow: 1,
      cursor: mouseDown ? 'grabbing' : 'grab',
      background: 'rgba(235,235,235)'
    }}
    onMouseDown={eventDown}
    onMouseMove={eventMove}
    onMouseUp={eventUp}
    onMouseOut={eventUp}
    onTouchStart={eventDown}
    onTouchMove={eventMove}
    onTouchEnd={eventUp}
  >
    <Paper
      id='screen'
      style={{
        width: isNaN(Imitation.state.graphConfig.screen.width) ? Imitation.state.graphConfig.screen.width : Imitation.state.graphConfig.screen.width + 'px',
        height: isNaN(Imitation.state.graphConfig.screen.height) ? Imitation.state.graphConfig.screen.height : Imitation.state.graphConfig.screen.height + 'px',
        transform: `
          translateX(${Imitation.state.graphConfig.screen.translateX}px)
          translateY(${Imitation.state.graphConfig.screen.translateY}px)
          scale(${Imitation.state.graphConfig.screen.scale})
        `,
        position: 'absolute',
        overflow: 'auto',
        transitionDuration: '0.5s',
        transitionProperty: 'width,height',
        cursor: 'default'
      }}
      onMouseDown={e => e.stopPropagation()}
      onTouchStart={e => e.stopPropagation()}
    >
      <Hover />
      <div>
        {
          Imitation.state.graphContent.map(i => <ElementRender key={i.id} element={i} />)
        }
      </div>
    </Paper>
  </Paper>
}

export default Imitation.withBindRender(App, state => [state.graphConfigUpdate, state.graphContentUpdate, state.graphElementUpdate, state.navigationTabsElementValue, state.elementHover])