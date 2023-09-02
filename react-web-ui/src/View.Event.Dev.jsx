import React from 'react'

import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { Divider } from '@mui/material'
import { Tooltip } from '@mui/material'
import { Paper } from '@mui/material'
import { Slider } from '@mui/material'
import GraphDev from './View.Graph.Dev'
import EventDev from './View.Event.Dev'

import Imitation from './utils.imitation'
import { hash, getElementById, getEventById, graphElementSearch } from './utils.common'

function NeuronLinkAction() {
  const mouseDownPosition = React.useRef(null)
  const fromPosition = React.useRef(null)
  const toPosition = React.useRef(null)

  const [update, setUpdate] = React.useState(0)

  const onMouseMove = e => {
    if (Imitation.state.runContext) return

    const changeX = (e.pageX) - mouseDownPosition.current.x
    const changeY = (e.pageY) - mouseDownPosition.current.y
    mouseDownPosition.current = { x: mouseDownPosition.current.x + changeX, y: mouseDownPosition.current.y + changeY }

    toPosition.current.x = Math.round(toPosition.current.x + changeX / Imitation.state.context.neuronViewport.scale)
    toPosition.current.y = Math.round(toPosition.current.y + changeY / Imitation.state.context.neuronViewport.scale)

    setUpdate(pre => pre + 1)
  }

  const color = React.useMemo(() => {
    if (Imitation.state.neuronMouseEnter && Imitation.state.neuronLinkAction && Imitation.state.neuronMouseEnter !== Imitation.state.neuronLinkAction.neuron) return ['black', 'green']
    return ['black', 'black']
  })

  React.useEffect(() => {
    if (!Imitation.state.neuronLinkAction) return null

    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [Imitation.state.neuronLinkAction])

  React.useEffect(() => {
    if (!Imitation.state.neuronLinkAction) {
      mouseDownPosition.current = null
      fromPosition.current = null
      toPosition.current = null
    }

    if (Imitation.state.neuronLinkAction) {
      mouseDownPosition.current = Imitation.state.neuronLinkAction.position
      fromPosition.current = offsetNeuronLine(Imitation.state.neuronLinkAction.neuron)
      toPosition.current = offsetNeuronLine(Imitation.state.neuronLinkAction.neuron)
    }

    setUpdate(pre => pre + 1)
  }, [Imitation.state.neuronLinkAction])

  if (!mouseDownPosition.current || !fromPosition.current || !toPosition.current) return null

  return <NeuronLink from={fromPosition.current} to={toPosition.current} color={color} />
}

function NeuronLink(props) {
  const refColor = React.useRef(hash())

  const [removeDialog, setRemoveDialog] = React.useState(false)

  const openRemoveDialog = () => {
    if (Imitation.state.runContext) return

    setRemoveDialog(true)
  }

  const remove = () => {
    Imitation.state.context.neuronLink = Imitation.state.context.neuronLink.filter(i_ => i_.id !== props.neuronLink.id)
    Imitation.dispatch()
  }

  const [x, y, x_, y_] = React.useMemo(() => {
    return [props.from.x, props.from.y, props.to.x, props.to.y]
  })

  const [x__, y__] = React.useMemo(() => {
    if (props.from.x >= props.to.x) var x = Math.min(props.from.x, props.to.x)
    if (props.from.x <= props.to.x) var x = Math.max(props.from.x, props.to.x)
    if (props.from.y >= props.to.y) var y = Math.max(props.from.y, props.to.y)
    if (props.from.y <= props.to.y) var y = Math.min(props.from.y, props.to.y)
    return [x, y]
  })

  const d = React.useMemo(() => {
    return `M ${Math.round(x)} ${Math.round(y)} Q ${Math.round(x__)} ${Math.round(y__)} ${Math.round(x_)} ${Math.round(y_)} Q ${Math.round(x__)} ${Math.round(y__)} ${Math.round(x)} ${Math.round(y)} Z`
  })

  const color = React.useMemo(() => {
    if (props.color) return props.color
    return ['black', 'red']
  })

  const strokeDasharray = React.useMemo(() => {
    if (Imitation.state.neuronLinkInformationMouseEnter && props.neuronLink && Imitation.state.neuronLinkInformationMouseEnter.id === props.neuronLink.id) return '2 4'
    if (Imitation.state.runLogMouseEnterArray.find(i => (i.from && i.from.find(i => i.id === props.neuronLink.from) && i.neuron.id === props.neuronLink.to) || (i.to && i.to.find(i => i.id === props.neuronLink.to) && i.neuron.id === props.neuronLink.from))) return '2 4'
    // if (Imitation.state.runContext && Imitation.state.runContext.log.find(i => i.neuron.id === props.neuronLink.from || i.neuron.id === props.neuronLink.to)) return '2 4'
    return '1 0'
  })

  const strokeWidth = React.useMemo(() => {
    return '1'
  })

  return <>
    <defs>
      <linearGradient id={refColor.current} x1={String(x / Imitation.state.refCanvas.current.offsetWidth)} y1={String(y / Imitation.state.refCanvas.current.offsetHeight)} x2={String(x_ / Imitation.state.refCanvas.current.offsetWidth)} y2={String(y_ / Imitation.state.refCanvas.current.offsetHeight)}>
        <stop offset='20%' stopColor={color[0]} />
        <stop offset='80%' stopColor={color[1]} />
      </linearGradient>
    </defs>

    <path d={d} style={{ fill: 'transparent', stroke: `url(#${refColor.current})`, strokeWidth: strokeWidth, strokeDasharray: strokeDasharray, cursor: 'pointer', transitionDuration: '0.5s', transitionProperty: 'stroke-dasharray, stroke-width' }} onClick={openRemoveDialog} />

    {
      removeDialog ? <RemoveDialog neuronLink={props.neuronLink} onClick={remove} onClose={() => setRemoveDialog()} /> : null
    }
  </>
}

function NeuronLinks() {
  return Imitation.state.context.neuronLink.map((i) => <NeuronLink key={i.id} from={offsetNeuronLine(Imitation.state.context.neuron.find(i_ => i_.id === i.from))} to={offsetNeuronLine(Imitation.state.context.neuron.find(i_ => i_.id === i.to))} neuronLink={i} />)
}

function Event(props) {
  const event = getEventById(Imitation.state.graphContent, props.content.eventId, props.content.eventType)
  const element = getElementById(Imitation.state.graphContent, props.content.elementId)

  const { information } = React.useMemo(() => graphElementSearch(element.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  const onMouseDown = e => {
    try {
      Imitation.assignState({ eventMouseDownTarget: props.content, eventMouseDownPosition: [e.pageX || e.targetTouches[0].pageX, e.pageY || e.targetTouches[0].pageY] })
    } catch { }

    e.stopPropagation()
  }

  return <Paper
    style={{
      position: 'absolute',
      inset: 0,
      margin: 'auto',
      zIndex: 2,
      width: 240,
      height: 'fit-content',
      padding: 16,
      transform: `translate(${props.content.translateX}px, ${props.content.translateY}px) scale(1)`,
      cursor: 'default'
    }}
    onMouseDown={onMouseDown}
    onTouchStart={onMouseDown}
  >
    <div style={{ position: 'absolute', right: 4, top: 4, fontSize: 12, opacity: 0.5, color: 'red' }}>
      {
        props.content.eventType
      }
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
        {
          element.name
        }
      </div>
    </div>

    {
      props.content.eventType === 'hook' ? //{ id: hash(), use: true, hookType: '', hookEval: evalEventMonitorDefault }
        <>

        </>
        : null
    }

    {
      props.content.eventType === 'monitor' ? //{ id: hash(), use: true, monitorName: hash(), monitorType: 'default', monitorEval: evalEventMonitorDefault, monitorKey: '' }
        <>
          <div>
            Monitor Name:
            {
              event.monitorName
            }
          </div>
          <div>
            Monitor Type:
            {
              event.monitorType
            }
          </div>
          <div>
            Monitor key:
            {
              information.monitor.find(i => i.value === event.monitorKey) ? information.monitor.find(i => i.value === event.monitorKey).label : '...'
            }
          </div>
        </>
        : null
    }

    {
      props.content.eventType === 'trigger' ? //{ id: hash(), use: true, triggerType: 'default', triggerEval: evalEventMonitorDefault, triggerKey: '', monitorName: '' }
        <>
          <div>
            Trigger Name:
            {
              event.triggerName
            }
          </div>
          <div>
            Trigger Type:
            {
              event.triggerType
            }
          </div>
          <div>
            Link Monitor Name:
            {
              event.monitorName
            }
          </div>
          <div>
            Trigger key:
            {
              information.trigger.find(i => i.value === event.triggerKey) ? information.trigger.find(i => i.value === event.triggerKey).label : '...'
            }
          </div>
        </>
        : null
    }

  </Paper>
}

function Events() {
  return Imitation.state.graphEvent.map(i => <Event key={i.eventId} content={i} />)
}

function App() {
  const onMouseDown = e => {
    try {
      Imitation.assignState({ eventMouseDownTarget: Imitation.state.graphConfig.screenEvent, eventMouseDownPosition: [e.pageX || e.targetTouches[0].pageX, e.pageY || e.targetTouches[0].pageY] })
    } catch { }
  }

  const onMouseUp = e => {
    Imitation.assignState({ eventMouseDownTarget: undefined, eventMouseDownPosition: undefined })
  }

  const onMouseMove = e => {
    if (Imitation.state.eventMouseDownTarget === undefined) return
    const changeX = (e.pageX || e.targetTouches[0].pageX) - Imitation.state.eventMouseDownPosition[0]
    const changeY = (e.pageY || e.targetTouches[0].pageY) - Imitation.state.eventMouseDownPosition[1]
    Imitation.state.eventMouseDownPosition = [Imitation.state.eventMouseDownPosition[0] + changeX, Imitation.state.eventMouseDownPosition[1] + changeY]

    if (Imitation.state.eventMouseDownTarget === Imitation.state.graphConfig.screenEvent) {
      Imitation.state.eventMouseDownTarget.translateX = Math.floor(Number(Imitation.state.eventMouseDownTarget.translateX) + changeX)
      Imitation.state.eventMouseDownTarget.translateY = Math.floor(Number(Imitation.state.eventMouseDownTarget.translateY) + changeY)
    }

    if (Imitation.state.eventMouseDownTarget !== Imitation.state.graphConfig.screenEvent) {
      Imitation.state.eventMouseDownTarget.translateX = Math.floor(Number(Imitation.state.eventMouseDownTarget.translateX) + changeX / Imitation.state.graphConfig.screenEvent.scale)
      Imitation.state.eventMouseDownTarget.translateY = Math.floor(Number(Imitation.state.eventMouseDownTarget.translateY) + changeY / Imitation.state.graphConfig.screenEvent.scale)
    }

    Imitation.assignState({ graphConfigUpdate: hash(), graphEventUpdate: hash() })
  }

  return <Paper
    className='font'
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    }}
  >
    <Paper
      style={{
        width: 100000,
        height: 100000,
        transform: `
          translateX(${Imitation.state.graphConfig.screenEvent.translateX}px)
          translateY(${Imitation.state.graphConfig.screenEvent.translateY}px)
          scale(${Imitation.state.graphConfig.screenEvent.scale})
        `,
        position: 'absolute',
        overflow: 'auto',
        transitionDuration: '0.5s',
        transitionProperty: 'width,height',
        cursor: Imitation.state.eventMouseDownTarget === Imitation.state.graphConfig.screenEvent ? 'grabbing' : 'grab',
        background: 'rgba(235,235,235)'
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onMouseDown}
      onTouchMove={onMouseMove}
      onTouchEnd={onMouseUp}
    >
      <Events />
    </Paper>

    {/* <svg style={{ position: 'absolute', inset: 0, margin: 'auto', zIndex: 1 }} width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <NeuronLinkAction />
      <NeuronLinks />
    </svg> */}

    <Paper style={{ position: 'absolute', bottom: 16, left: 0, right: 0, margin: 'auto', width: 480, maxWidth: 'calc(100% - 32px)', padding: '8px 24px' }}>
      <Slider className='font' value={Imitation.state.graphConfig.screenEvent.scale} onChange={(e, v) => { Imitation.state.graphConfig.screenEvent.scale = v; Imitation.assignState({ graphConfigUpdate: hash() }) }} min={0} max={2} step={0.01} valueLabelDisplay='auto' />
    </Paper>

  </Paper>
}

export default Imitation.withBindRender(App, state => [state.graphEventUpdate, state.graphConfigUpdate, state.navigationTabsValue, state.eventMouseDownTarget, state.eventMouseDownPosition])