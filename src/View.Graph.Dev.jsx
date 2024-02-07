import React from 'react'

import { Paper } from '@mui/material'
import { Slider } from '@mui/material'

import Imitation from './utils.imitation'
import { caculateStyle } from './utils.graph.style'
import { hash } from './utils.common'
import { searchElement } from './utils.graph.common'
import { scrollListener } from './utils.common.scrollListener'

function HintItem(props) {
  const base = 2

  const style = {
    position: 'absolute',
    cursor: 'default',
  }

  const event = {
    onMouseDown: e => e.stopPropagation(),
    onTouchStart: e => e.stopPropagation(),
  }

  return <>
    <div style={{ ...style, width: props.position.width, height: base, top: props.position.top - base, left: props.position.left, background: props.color }} {...event} />
    <div style={{ ...style, width: props.position.width, height: base, top: props.position.bottom, left: props.position.left, background: props.color }} {...event} />
    <div style={{ ...style, width: base, height: props.position.height, top: props.position.top, left: props.position.left - base, background: props.color }} {...event} />
    <div style={{ ...style, width: base, height: props.position.height, top: props.position.top, left: props.position.right, background: props.color }} {...event} />
  </>
}

function Hint() {
  const rectRef = React.useRef()

  const [hover, setHover] = React.useState()
  const [select, setSelect] = React.useState()
  const [dragStart, setDragStart] = React.useState()
  const [dragEnd, setDragEnd] = React.useState()

  const computePosition = (node) => {
    const rect_ = node.getBoundingClientRect()
    const rect = { left: rect_.left, right: rect_.right, top: rect_.top, bottom: rect_.bottom, width: rect_.width, height: rect_.height }

    rect.left = rect.left - rectRef.current.left
    rect.right = rect.right - rectRef.current.left
    rect.top = rect.top - rectRef.current.top
    rect.bottom = rect.bottom - rectRef.current.top

    return rect
  }

  React.useEffect(() => {
    rectRef.current = Imitation.state.graphDevRootRef.getBoundingClientRect()
  }, [Imitation.state.graphContentUpdate])

  React.useEffect(() => {
    if (Imitation.state.elementHover === undefined || Imitation.state.elementDragStart !== undefined || Imitation.state.elementDragEnd !== undefined) { setHover(); return; }

    const [id, id_] = Imitation.state.elementHover.split('@')

    const node = document.querySelector(`[data-element-id="${id}"]`) || document.querySelector(`[data-element-children-id="${id_}"]`)

    if (node !== null) setHover(computePosition(node))
    if (node === null) setHover()
  }, [Imitation.state.elementHover, Imitation.state.elementDragStart, Imitation.state.elementDragEnd])

  React.useEffect(() => {
    if (Imitation.state.elementSelect === undefined || Imitation.state.elementDragStart !== undefined || Imitation.state.elementDragEnd !== undefined) { setSelect(); return; }

    const [id, id_] = Imitation.state.elementSelect.split('@')

    const node = document.querySelector(`[data-element-id="${id}"]`) || document.querySelector(`[data-element-children-id="${id_}"]`)

    if (node) setSelect(computePosition(node))
  }, [Imitation.state.elementSelect, Imitation.state.elementDragStart, Imitation.state.elementDragEnd])

  React.useEffect(() => {
    if (Imitation.state.elementDragStart === undefined) { setDragStart(); return; }

    const [id, id_] = Imitation.state.elementDragStart.split('@')

    const node = document.querySelector(`[data-element-id="${id}"]`) || document.querySelector(`[data-element-children-id="${id_}"]`)

    if (node) setDragStart(computePosition(node))
  }, [Imitation.state.elementDragStart])

  React.useEffect(() => {
    if (Imitation.state.elementDragEnd === undefined) { setDragEnd(); return; }

    const [id, id_] = Imitation.state.elementDragEnd.split('@')

    const node = document.querySelector(`[data-element-id="${id}"]`) || document.querySelector(`[data-element-children-id="${id_}"]`)

    if (node) setDragEnd(computePosition(node))
  }, [Imitation.state.elementDragEnd])

  return <>
    {
      hover ? <HintItem position={hover} color='black' /> : null
    }
    {
      select ? <HintItem position={select} color={Imitation.state.theme.palette.primary.main} /> : null
    }
    {
      dragStart ? <HintItem position={dragStart} color={Imitation.state.theme.palette.secondary.main} /> : null
    }
    {
      dragEnd ? <HintItem position={dragEnd} color={Imitation.state.theme.palette.success.main} /> : null
    }
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

  const mouseDownRef = React.useRef()

  const [update, setUpdate] = React.useState(0)
  const update_ = () => setUpdate(pre => pre + 1)

  const onClick = (e, id) => {
    Imitation.assignState({ elementSelect: id, navigationTabsValue: 'ElementConfig' })

    e.stopPropagation()
    e.preventDefault()
  }

  const onMouseOver = (e, id) => {
    if (Imitation.state.elementDragStart !== undefined) {
      if (parentId.includes(Imitation.state.elementDragStart) === false && id !== Imitation.state.elementDragStart && id.split('@')[0] !== Imitation.state.elementDragStart) {
        Imitation.state.elementDragEnd = id
      }
      if (parentId.includes(Imitation.state.elementDragStart) === true || id === Imitation.state.elementDragStart || id.split('@')[0] === Imitation.state.elementDragStart) {
        Imitation.state.elementDragEnd = undefined
      }
    }

    if (Imitation.state.elementDragStart === undefined) {
      Imitation.state.elementHover = id
    }

    Imitation.dispatch()

    e.stopPropagation()
    e.preventDefault()
  }

  const onMouseDown = (e) => {
    mouseDownRef.current = true

    e.stopPropagation()
  }

  const onMouseMove = (e, id) => {
    if (mouseDownRef.current === true) Imitation.assignState({ elementDragStart: id })
  }

  const onMouseUp = (e) => {
    mouseDownRef.current = false
  }

  React.useEffect(() => {
    window.addEventListener('mouseup', onMouseUp)

    return () => window.removeEventListener('mouseup', onMouseUp)
  }, [])

  const children_exe = React.useMemo(() => {
    if (!children) return
    const r = {}
    Object.entries(children).forEach(i => {
      const id_ = id + '@' + i[0]

      const params = {
        id: id_,
        'data-element-children-id': i[0],
        onMouseOver: e => onMouseOver(e, id_),
        onMouseDown: e => onMouseDown(e, id_),
        onMouseMove: e => onMouseMove(e, id_),
        onDragEnter: e => onDragEnter(e, id_),
        onClick: e => onClick(e, id_)
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
    id: id,
    'data-element-id': id,
    onClick: e => onClick(e, id),
    onMouseOver: e => onMouseOver(e, id),
    onMouseDown: e => onMouseDown(e, id),
    onMouseMove: e => onMouseMove(e, id),
  }

  if (use === false) return null

  return <Render env='dev' update={update_} devParams={devParams} element={props.element} property={property} style={style_exe} children={children_exe} />
}

function App() {
  const mouseDownPosition = React.useRef(null)

  const [mouseDown, setMouseDown] = React.useState(false)

  const onMouseDown = e => {
    mouseDownPosition.current = [e.pageX, e.pageY]
    setMouseDown(true)
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
    Imitation.state.graphConfigUpdate = hash()
    Imitation.state.elementHover = undefined
    Imitation.state.elementSelect = undefined
    Imitation.state.elementDragStart = undefined
    Imitation.state.elementDragEnd = undefined
    Imitation.dispatch()
  }

  const onTouchStart = e => {
    mouseDownPosition.current = [e.targetTouches[0].pageX, e.targetTouches[0].pageY]
    setMouseDown(true)
  }

  const onTouchMove = e => {
    mouseDownPosition.current = null
    setMouseDown(false)
  }

  const onTouchEnd = e => {
    if (!mouseDownPosition.current) return
    const changeX = (e.pageX || e.targetTouches[0].pageX) - mouseDownPosition.current[0]
    const changeY = (e.pageY || e.targetTouches[0].pageY) - mouseDownPosition.current[1]
    mouseDownPosition.current = [mouseDownPosition.current[0] + changeX, mouseDownPosition.current[1] + changeY]
    Imitation.state.graphConfig.screenGraph.translateX = Math.floor(Number(Imitation.state.graphConfig.screenGraph.translateX) + changeX)
    Imitation.state.graphConfig.screenGraph.translateY = Math.floor(Number(Imitation.state.graphConfig.screenGraph.translateY) + changeY)
    Imitation.assignState({ graphConfigUpdate: hash() })
  }

  const onMouseLeave = e => {
    mouseDownPosition.current = null
    setMouseDown(false)
  }

  const onChangeSlider = (e, v) => {
    Imitation.state.graphConfig.screenGraph.scale = v
    Imitation.state.graphConfigUpdate = hash()
    Imitation.state.elementHover = undefined
    Imitation.state.elementSelect = undefined
    Imitation.state.elementDragStart = undefined
    Imitation.state.elementDragEnd = undefined
    Imitation.dispatch()
  }

  React.useEffect(() => {
    const node = Imitation.state.graphDevContentRef
    const enable = Imitation.state.elementDragStart !== undefined

    const r = scrollListener(node, enable)

    return () => r()
  }, [Imitation.state.elementDragStart])

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
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseLeave={onMouseLeave}
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
        ref={el => Imitation.state.graphDevContentRef = el}
        className='cursor'
      >
        <div>
          {
            Imitation.state.graphContent.map(i => <ElementRender key={i.id} element={i} parentId={[]} />)
          }
        </div>
      </Paper>

      <Paper style={{ position: 'absolute', bottom: 16, left: 0, right: 0, margin: 'auto', width: 480, maxWidth: 'calc(100% - 32px)', padding: '8px 24px' }}>
        <Slider className='font' value={Imitation.state.graphConfig.screenGraph.scale} onChange={onChangeSlider} min={0} max={2} step={0.01} valueLabelDisplay='auto' onMouseDown={e => e.stopPropagation()} />
      </Paper>

      <Hint />
    </Paper>
  </>
}

export default Imitation.withBindRender(App, state => [state.graphConfigUpdate, state.graphContentUpdate, state.graphElementUpdate, state.elementSelect, state.elementHover, state.elementDragStart, state.elementDragEnd])