import React from 'react'

import { Paper } from '@mui/material'

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import Imitation from './utils.imitation'
import { caculateStyle } from './utils.graph.style'
import { graphElementSearch } from './utils.graph.common'
import { deepSearch, hash, deleteArrayItem } from './utils.common'

var hoverTimeout = null

function Hover() {
  const timeRef = React.useRef()

  const [position, setPosition] = React.useState()

  const handle = () => {
    const node = document.getElementById(Imitation.state.elementHover)

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
    const node = document.getElementById(Imitation.state.navigationTabsElementValue)

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
  const { drag, parentId } = props
  const { license, id, use, style, property, children } = props.element

  const { Render } = React.useMemo(() => graphElementSearch(license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!Render) {
    console.warn(license)
    Imitation.assignState({ message: 'Element Error' })
    return null
  }

  const [, setUpdate] = React.useState(0)
  const update = () => setUpdate(pre => pre + 1)

  const onMouseOver = (e, id) => {
    hoverTimeout = null
    Imitation.assignState({ elementHover: id })

    e.stopPropagation()
  }

  const onMouseOut = (e) => {
    hoverTimeout = setTimeout(() => {
      if (hoverTimeout) Imitation.assignState({ elementHover: undefined })
    }, 50)

    e.stopPropagation()
  }

  const onClick = (e) => {
    Imitation.assignState({ navigationTabsElementValue: id, navigationTabsValue: 'ElementConfig' })

    e.stopPropagation()
  }

  const onDragStart = (e) => {
    drag.setDragStart(id)
    Imitation.assignState({ elementHover: undefined })

    e.stopPropagation()
  }

  const onDragEnter = (e, id) => {
    if (parentId.includes(drag.dragStart) === false && id !== drag.dragStart) {
      drag.setDragMove(id)
      Imitation.assignState({ elementHover: id })
    }
    if (parentId.includes(drag.dragStart) === true || id === drag.dragStart) {
      drag.setDragMove(undefined)
      Imitation.assignState({ elementHover: undefined })
    }

    e.stopPropagation()
  }

  const onDragEnd = (e) => {
    if (drag.dragStart && drag.dragMove && drag.dragStart !== drag.dragMove) {
      if (drag.dragMove.includes('@')) {
        const [id, childrenKey] = drag.dragMove.split('@')
        const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'id', drag.dragStart)
        const [currentGraphContent_, parentGraphContent_] = deepSearch(Imitation.state.graphContent, 'id', id)
        deleteArrayItem(parentGraphContent, currentGraphContent)
        currentGraphContent_.children[childrenKey].push(currentGraphContent)

      } else {
        const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'id', drag.dragStart)
        const [currentGraphContent_, parentGraphContent_] = deepSearch(Imitation.state.graphContent, 'id', drag.dragMove)
        deleteArrayItem(parentGraphContent, currentGraphContent)
        const index = parentGraphContent_.indexOf(currentGraphContent_)
        parentGraphContent_.splice(index + 1, 0, currentGraphContent)
      }
    }
    Imitation.assignState({ graphContent: Imitation.state.graphContent, graphContentUpdate: hash() })
    drag.setDragStart(undefined)
    drag.setDragMove(undefined)

    e.stopPropagation()
  }

  const childrenExe = React.useMemo(() => {
    if (!children) return
    const r = {}
    Object.entries(children).forEach(i => {
      const id_ = id + '@' + i[0]

      const params = {
        onMouseOver: e => onMouseOver(e, id_),
        onMouseOut: e => onMouseOut(e),
        onDragEnd: e => onDragEnd(e),
        onDragEnter: e => onDragEnter(e, id_)
      }

      r[i[0]] = () => {
        return <Paper style={{ padding: 8 }} id={id_} {...params}>
          <Paper style={{ padding: 8, background: 'rgba(235,235,235)' }} className='font-single'>i[0]</Paper>
          {
            i[1].map(i => {
              return <ElementRender key={i.id} element={i} drag={drag} parentId={[...parentId, id]} />
            })
          }
        </Paper>
      }
    })
    return r
  })

  const params = {
    onClick: e => onClick(e),
    onMouseOver: e => onMouseOver(e, id),
    onMouseOut: e => onMouseOut(e),
    onDragStart: e => onDragStart(e),
    onDragEnd: e => onDragEnd(e),
    onDragEnter: e => onDragEnter(e, id),
    draggable: true,
    id: id,
    style: { ...caculateStyle(style), cursor: 'pointer', boxSizing: 'border-box' },
  }

  if (use === false) return null

  return <Render env='dev' update={update} element={props.element} children={childrenExe} params={params} property={property} />
}

function App() {
  const mouseDownPosition = React.useRef(null)

  const [mouseDown, setMouseDown] = React.useState(false)
  const [dragStart, setDragStart] = React.useState()
  const [dragMove, setDragMove] = React.useState()

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

  const drag = { dragStart, setDragStart, dragMove, setDragMove }

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
            Imitation.state.graphContent.map(i => <ElementRender key={i.id} element={i} drag={drag} parentId={[]} />)
          }
        </div>
      </Paper>

    </Paper>

    <Hover />
    <Active />
  </>
}

export default Imitation.withBindRender(App, state => [state.graphConfigUpdate, state.graphContentUpdate, state.graphElementUpdate, state.navigationTabsElementValue, state.elementHover])