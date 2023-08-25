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

  const { Render, information } = React.useMemo(() => graphElementSearch(license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

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
    Imitation.assignState({ elementDragStart: id, elementHover: undefined })

    e.stopPropagation()
  }

  const onDragEnter = (e, id) => {
    if (parentId.includes(Imitation.state.elementDragStart) === false && id !== Imitation.state.elementDragStart && id.split('@')[0] !== Imitation.state.elementDragStart) {
      Imitation.assignState({ elementDragEnter: id, elementHover: id })
    }
    if (parentId.includes(Imitation.state.elementDragStart) === true || id === Imitation.state.elementDragStart || id.split('@')[0] === Imitation.state.elementDragStart) {
      Imitation.assignState({ elementDragEnter: undefined, elementHover: undefined })
    }

    e.stopPropagation()
  }

  const onDragEnd = (e) => {
    if (Imitation.state.elementDragStart && Imitation.state.elementDragEnter && Imitation.state.elementDragStart !== Imitation.state.elementDragEnter) {
      if (Imitation.state.elementDragEnter.includes('@')) {
        const [id, childrenKey] = Imitation.state.elementDragEnter.split('@')
        const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'id', Imitation.state.elementDragStart)
        const [currentGraphContent_, parentGraphContent_] = deepSearch(Imitation.state.graphContent, 'id', id)
        deleteArrayItem(parentGraphContent, currentGraphContent)
        currentGraphContent_.children[childrenKey].push(currentGraphContent)
      } else {
        const [currentGraphContent, parentGraphContent] = deepSearch(Imitation.state.graphContent, 'id', Imitation.state.elementDragStart)
        const [currentGraphContent_, parentGraphContent_] = deepSearch(Imitation.state.graphContent, 'id', Imitation.state.elementDragEnter)
        deleteArrayItem(parentGraphContent, currentGraphContent)
        const index = parentGraphContent_.indexOf(currentGraphContent_)
        parentGraphContent_.splice(index + 1, 0, currentGraphContent)
      }
    }
    Imitation.assignState({ elementDragStart: undefined, elementDragEnter: undefined, graphContent: Imitation.state.graphContent, graphContentUpdate: hash() })

    e.stopPropagation()
  }

  const children_exe = React.useMemo(() => {
    if (!children) return
    const r = {}
    Object.entries(children).forEach(i => {
      const id_ = id + '@' + i[0]
      const title = information.children.find(i_ => i_.value === i[0]).label

      const params = {
        onMouseOver: e => onMouseOver(e, id_),
        onMouseOut: e => onMouseOut(e),
        onDragEnter: e => onDragEnter(e, id_)
      }

      r[i[0]] = () => {
        return <Paper style={{ padding: Imitation.state.elementDragStart ? 8 : 0, transition: '0.5s all' }} id={id_} {...params}>
          <Paper style={{ background: 'rgba(235,235,235)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', padding: Imitation.state.elementDragStart ? 8 : 0, height: Imitation.state.elementDragStart ? 14 : 0, transition: '0.5s all' }} className='font-single'>{title}</Paper>
          {
            i[1].map(i => {
              return <ElementRender key={i.id} element={i} parentId={[...parentId, id]} />
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

  return <Render env='dev' update={update} params={params} element={props.element} property={property} children={children_exe} />
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

  const onDragEnter = () => {
    Imitation.assignState({ elementDragEnter: undefined, elementHover: undefined })
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
      onDragEnter={onDragEnter}
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
            Imitation.state.graphContent.map(i => <ElementRender key={i.id} element={i} parentId={[]} />)
          }
        </div>
      </Paper>

    </Paper>

    <Hover />
    <Active />
  </>
}

export default Imitation.withBindRender(App, state => [state.graphConfigUpdate, state.graphContentUpdate, state.graphElementUpdate, state.navigationTabsElementValue, state.elementHover])