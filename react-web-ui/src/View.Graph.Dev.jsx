import React from 'react'

import { Paper } from '@mui/material'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import Imitation from './utils.imitation'
import { hash } from './utils.common'
import { caculateStyle } from './utils.graph.style'
import { graphElementSearch } from './utils.graph.common'

var hoverTimeout = null

function Hover() {
  const timeRef = React.useRef()

  const [position, setPosition] = React.useState()

  const handle = () => {
    const node = document.querySelector('[data-status=hover]')

    if (node !== null) {
      setPosition(node.getBoundingClientRect())
    }
    if (node === null) {
      setPosition()
    }
  }

  React.useEffect(() => {
    handle()

    timeRef.current = setInterval(() => handle(), 500)

    return () => clearInterval(timeRef.current)
  }, [Imitation.state.elementHover, Imitation.state.graphContentUpdate])

  if (position === undefined) return null

  const style = {
    transition: '0.5s all',
    position: 'absolute',
    zIndex: 1,
    background: '#000',
    borderRadius: '50%'
  }

  return <>
    <div style={{ ...style, width: position.width, height: 2, top: position.top - 4, left: position.left }} className='element-hover' />
    <div style={{ ...style, width: position.width, height: 2, top: position.bottom, left: position.left }} className='element-hover' />
    <div style={{ ...style, width: 2, height: position.height, top: position.top, left: position.left - 4 }} className='element-hover' />
    <div style={{ ...style, width: 2, height: position.height, top: position.top, left: position.right }} className='element-hover' />
  </>
}

function Active() {
  const timeRef = React.useRef()

  const [position, setPosition] = React.useState()

  const handle = () => {
    const node = document.querySelector('[data-status=active]')

    if (node !== null) {
      setPosition(node.getBoundingClientRect())
    }
    if (node === null) {
      setPosition()
    }
  }

  React.useEffect(() => {
    handle()

    timeRef.current = setInterval(() => handle(), 500)

    return () => clearInterval(timeRef.current)
  }, [Imitation.state.navigationTabsElementValue, Imitation.state.graphContentUpdate])

  if (position === undefined) return null

  const style = {
    transition: '0.5s all',
    position: 'absolute',
    zIndex: 1,
    background: 'rgb(25, 118, 210)',
    borderRadius: '50%'
  }

  return <>
    <div style={{ ...style, width: position.width, height: 2, top: position.top - 4, left: position.left }} className='element-hover' />
    <div style={{ ...style, width: position.width, height: 2, top: position.bottom, left: position.left }} className='element-hover' />
    <div style={{ ...style, width: 2, height: position.height, top: position.top, left: position.left - 4 }} className='element-hover' />
    <div style={{ ...style, width: 2, height: position.height, top: position.top, left: position.right }} className='element-hover' />
  </>
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

  // const onMouseDown = e => {
  //   e.stopPropagation()
  //   e.preventDefault()
  // }
  // const onMouseUp = e => {
  //   e.stopPropagation()
  //   e.preventDefault()
  // }
  const onMouseOver = e => {
    hoverTimeout = null
    Imitation.assignState({ elementHover: id })
    e.stopPropagation()

    requestAnimationFrame
  }
  const onMouseOut = e => {
    hoverTimeout = setTimeout(() => {
      if (hoverTimeout) Imitation.assignState({ elementHover: undefined })
    }, 50)
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
      r[i[0]] = () => i[1].map(i => <div style={{ padding: 24 }}><ElementRender key={i.id} element={i} /></div>)
    })
    return r
  })

  const event = { onClick, onMouseOver, onMouseOut }

  const style_exe = {
    style: { ...caculateStyle(style), cursor: 'pointer', boxSizing: 'border-box' }
  }

  if (Imitation.state.elementHover && Imitation.state.elementHover === id) {
    style_exe['data-status'] = 'hover'
  }

  if (Imitation.state.navigationTabsElementValue && (Imitation.state.navigationTabsElementValue === id || Imitation.state.navigationTabsElementValue.split('@')[0] === id)) {
    style_exe['data-status'] = 'active'
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
  const mouseDownPosition = React.useRef(null)

  const [mouseDown, setMouseDown] = React.useState(false)

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

  return <>
    <Paper
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
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
        <div>
          {
            Imitation.state.graphContent.map(i => <ElementRender key={i.id} element={i} />)
          }
        </div>
      </Paper>

    </Paper>

    <Hover />
    <Active />
  </>
}

export default Imitation.withBindRender(App, state => [state.graphConfigUpdate, state.graphContentUpdate, state.graphElementUpdate, state.navigationTabsElementValue, state.elementHover])