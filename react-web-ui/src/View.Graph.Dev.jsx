import React from 'react'

import { Paper } from '@mui/material'
import { Slider } from '@mui/material'

import Imitation from './utils.imitation'
import { caculateStyle } from './utils.graph.style'
import { getElementAndParentById, hash, deleteArrayItem, searchElement } from './utils.common'

function Hover() {
  const timeRef = React.useRef()

  const [position, setPosition] = React.useState()

  const handle = () => {
    const node = document.getElementById(Imitation.state.elementHover)

    if (node !== null) {
      const rect_ = node.getBoundingClientRect()
      const rect = { left: rect_.left, right: rect_.right, top: rect_.top, bottom: rect_.bottom, width: rect_.width, height: rect_.height }

      rect.left = rect.left - Imitation.state.graphDevRootRef.offsetLeft
      rect.right = rect.right - Imitation.state.graphDevRootRef.offsetLeft
      rect.top = rect.top - Imitation.state.graphDevRootRef.offsetTop
      rect.bottom = rect.bottom - Imitation.state.graphDevRootRef.offsetTop

      setPosition(rect)
    }
    if (node === null) {
      setPosition()
    }
  }

  React.useEffect(() => {
    handle()

    timeRef.current = setInterval(() => handle(), 1000)

    return () => clearInterval(timeRef.current)
  }, [Imitation.state.elementHover, Imitation.state.graphContentUpdate])

  if (position === undefined) return null

  const style = {
    transition: '0.5s all',
    position: 'absolute',
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
      const rect_ = node.getBoundingClientRect()
      const rect = { left: rect_.left, right: rect_.right, top: rect_.top, bottom: rect_.bottom, width: rect_.width, height: rect_.height }

      rect.left = rect.left - Imitation.state.graphDevRootRef.offsetLeft
      rect.right = rect.right - Imitation.state.graphDevRootRef.offsetLeft
      rect.top = rect.top - Imitation.state.graphDevRootRef.offsetTop
      rect.bottom = rect.bottom - Imitation.state.graphDevRootRef.offsetTop

      setPosition(rect)
    }
    if (node === null) {
      setPosition()
    }
  }

  React.useEffect(() => {
    handle()

    timeRef.current = setInterval(() => handle(), 1000)

    return () => clearInterval(timeRef.current)
  }, [Imitation.state.navigationTabsElementValue, Imitation.state.graphContentUpdate])

  if (position === undefined) return null

  const style = {
    transition: '0.5s all',
    position: 'absolute',
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
  const { parentId } = props

  const { license, id, use, style, property, children } = props.element

  const { Render, information } = React.useMemo(() => searchElement(license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  if (!Render) {
    console.warn(license)
    Imitation.assignState({ message: 'Element Error' })
    return null
  }

  const [, setUpdate] = React.useState(0)
  const update = () => setUpdate(pre => pre + 1)

  const onClick = (e) => {
    Imitation.assignState({ navigationTabsElementValue: id, navigationTabsValue: 'ElementConfig' })

    e.stopPropagation()
    e.preventDefault()
  }

  const onMouseOver = (e, id) => {
    if (Imitation.state.elementDragStart !== undefined) return

    Imitation.assignState({ elementHover: id })

    e.stopPropagation()
    e.preventDefault()
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
        const [currentGraphContent, parentGraphContent] = getElementAndParentById(Imitation.state.graphContent, Imitation.state.elementDragStart)
        const [currentGraphContent_, parentGraphContent_] = getElementAndParentById(Imitation.state.graphContent, id)
        deleteArrayItem(parentGraphContent, currentGraphContent)
        currentGraphContent_.children[childrenKey].push(currentGraphContent)
      } else {
        const [currentGraphContent, parentGraphContent] = getElementAndParentById(Imitation.state.graphContent, Imitation.state.elementDragStart)
        const [currentGraphContent_, parentGraphContent_] = getElementAndParentById(Imitation.state.graphContent, Imitation.state.elementDragEnter)
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
        id: id_,
        onMouseOver: e => onMouseOver(e, id_),
        onDragEnter: e => onDragEnter(e, id_)
      }

      r[i[0]] = () => i[1].map(i => <ElementRender key={i.id} element={i} parentId={[...parentId, id]} />)
      r[i[0]].devParams = params
    })
    return r
  })

  const style_exe = React.useMemo(() => {
    if (!style) return
    const r = {}
    Object.entries(style).forEach(i => {
      r[i[0]] = caculateStyle(i[1])
    })
    return r
  })

  const devParams = {
    onClick: e => onClick(e),
    onMouseOver: e => onMouseOver(e, id),
    onDragStart: e => onDragStart(e),
    onDragEnd: e => onDragEnd(e),
    onDragEnter: e => onDragEnter(e, id),
    draggable: true,
    id: id,
  }

  if (use === false) return null

  return <Render env='dev' update={update} devParams={devParams} element={props.element} property={property} style={style_exe} children={children_exe} />
}

function App() {
  const mouseDownPosition = React.useRef(null)

  const [mouseDown, setMouseDown] = React.useState(false)

  const onMouseDown = e => {
    try {
      mouseDownPosition.current = [e.pageX || e.targetTouches[0].pageX, e.pageY || e.targetTouches[0].pageY]
      setMouseDown(true)
    } catch { }
  }

  const onMouseUp = e => {
    mouseDownPosition.current = null
    setMouseDown(false)
  }

  const onMouseMove = e => {
    if (!mouseDownPosition.current) return
    const changeX = (e.pageX || e.targetTouches[0].pageX) - mouseDownPosition.current[0]
    const changeY = (e.pageY || e.targetTouches[0].pageY) - mouseDownPosition.current[1]
    mouseDownPosition.current = [mouseDownPosition.current[0] + changeX, mouseDownPosition.current[1] + changeY]
    Imitation.state.graphConfig.screenGraph.translateX = Math.floor(Number(Imitation.state.graphConfig.screenGraph.translateX) + changeX)
    Imitation.state.graphConfig.screenGraph.translateY = Math.floor(Number(Imitation.state.graphConfig.screenGraph.translateY) + changeY)
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
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchMove={onMouseMove}
      onTouchEnd={onMouseUp}
      ref={el => Imitation.state.graphDevRootRef = el}
    >
      <Paper
        style={{
          width: isNaN(Imitation.state.graphConfig.screenGraph.width) ? Imitation.state.graphConfig.screenGraph.width : Imitation.state.graphConfig.screenGraph.width + 'px',
          height: isNaN(Imitation.state.graphConfig.screenGraph.height) ? Imitation.state.graphConfig.screenGraph.height : Imitation.state.graphConfig.screenGraph.height + 'px',
          transform: `
          translateX(${Imitation.state.graphConfig.screenGraph.translateX}px)
          translateY(${Imitation.state.graphConfig.screenGraph.translateY}px)
          scale(${Imitation.state.graphConfig.screenGraph.scale})
        `,
          position: 'absolute',
          overflow: 'auto',
          transitionDuration: '0.5s',
          transitionProperty: 'width,height',
          cursor: 'default',
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

      <Paper style={{ position: 'absolute', bottom: 16, left: 0, right: 0, margin: 'auto', width: 480, maxWidth: 'calc(100% - 32px)', padding: '8px 24px' }}>
        <Slider className='font' value={Imitation.state.graphConfig.screenGraph.scale} onChange={(e, v) => { Imitation.state.graphConfig.screenGraph.scale = v; Imitation.assignState({ graphConfigUpdate: hash() }) }} min={0} max={2} step={0.01} valueLabelDisplay='auto' onMouseDown={e => e.stopPropagation()} />
      </Paper>

      <Hover />
      <Active />
    </Paper>
  </>
}

export default Imitation.withBindRender(App, state => [state.graphConfigUpdate, state.graphContentUpdate, state.graphElementUpdate, state.navigationTabsElementValue, state.elementHover, state.elementDragStart])