import React from 'react'

import { Tabs } from '@mui/material'
import { Tab } from '@mui/material'
import { Divider } from '@mui/material'
import { Tooltip } from '@mui/material'
import { Paper } from '@mui/material'
import { Slider } from '@mui/material'
import { IconButton } from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'

import Imitation from './utils.imitation'
import { hash, getElementById, getEventById, getMonitorOptionsAll, updateTriggerLink, convertCamelCase } from './utils.common'
import { searchElement } from './utils.graph.common'

import { EventDialog } from './View.Component.EventDialog'

const offsetLink = (item) => {
  return { ...item, x: item.x + Imitation.state.eventDevRootRef.offsetWidth / 2, y: item.y + Imitation.state.eventDevRootRef.offsetHeight / 2 }
}

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

function Link(props) {
  const refColor = React.useRef(hash())

  const [removeDialog, setRemoveDialog] = React.useState(false)

  const openRemoveDialog = () => {
    if (Imitation.state.runContext) return

    setRemoveDialog(true)
  }

  // const remove = () => {
  //   Imitation.state.context.neuronLink = Imitation.state.context.neuronLink.filter(i_ => i_.id !== props.neuronLink.id)
  //   Imitation.dispatch()
  // }

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
    // if (props.color) return props.color
    return ['green', 'red']
  })

  const strokeDasharray = React.useMemo(() => {
    // if (Imitation.state.neuronLinkInformationMouseEnter && props.neuronLink && Imitation.state.neuronLinkInformationMouseEnter.id === props.neuronLink.id) return '2 4'
    // if (Imitation.state.runLogMouseEnterArray.find(i => (i.from && i.from.find(i => i.id === props.neuronLink.from) && i.neuron.id === props.neuronLink.to) || (i.to && i.to.find(i => i.id === props.neuronLink.to) && i.neuron.id === props.neuronLink.from))) return '2 4'
    // if (Imitation.state.runContext && Imitation.state.runContext.log.find(i => i.neuron.id === props.neuronLink.from || i.neuron.id === props.neuronLink.to)) return '2 4'
    return '1 0'
  })

  const strokeWidth = React.useMemo(() => {
    return '1'
  })

  return <>
    <defs>
      <linearGradient id={refColor.current} x1={String(x / Imitation.state.eventDevRootRef.offsetWidth)} y1={String(y / Imitation.state.eventDevRootRef.offsetHeight)} x2={String(x_ / Imitation.state.eventDevRootRef.offsetWidth)} y2={String(y_ / Imitation.state.eventDevRootRef.offsetHeight)}>
        <stop offset='20%' stopColor={color[0]} />
        <stop offset='80%' stopColor={color[1]} />
      </linearGradient>
    </defs>

    <path d={d} style={{ fill: 'transparent', stroke: `url(#${refColor.current})`, strokeWidth: strokeWidth, strokeDasharray: strokeDasharray, cursor: 'pointer', transitionDuration: '0.5s', transitionProperty: 'stroke-dasharray, stroke-width' }} onClick={openRemoveDialog} />

    {
      // removeDialog ? <RemoveDialog neuronLink={props.neuronLink} onClick={remove} onClose={() => setRemoveDialog()} /> : null
    }
  </>
}

function Links(props) {
  const result = React.useMemo(() => {
    const r = []

    props.graphEvent.filter(i => i.eventType === 'trigger').forEach(trigger => {
      trigger.event.linkId.forEach(linkId => {
        const monitor = props.graphEvent.find(i => i.eventId === linkId)

        r.push({ from: { ...trigger, x: trigger.translateX, y: trigger.translateY }, to: { ...monitor, x: monitor.translateX, y: monitor.translateY }, id: trigger.eventId + monitor.eventId })
      })
    })

    return r
  }, [props.graphEvent])

  return result.map((i) => <Link key={i.id} from={offsetLink(i.from)} to={offsetLink(i.to)} />)
}

function Event(props) {
  const { information } = React.useMemo(() => searchElement(props.element.license, Imitation.state.graphElement), [Imitation.state.graphElementUpdate])

  const [eventDialog, setEventDialog] = React.useState()

  const hoverStyle = (id) => {
    return Imitation.state.elementHover === id ? { background: 'rgb(25, 118, 210)', color: 'white', fill: 'white' } : {}
  }

  const typeStyle = () => {
    var background = ''

    if (props.eventType === 'monitor') background = 'red'
    if (props.eventType === 'trigger') background = 'green'
    if (props.eventType === 'hook') background = 'blue'

    var opacity = props.event.use ? 1 : 0.25

    return { background, opacity }
  }

  const onMouseDown = e => {
    try {
      Imitation.assignState({ eventMouseDownTarget: Imitation.state.graphEvent.find(i => i.elementId === props.elementId && i.eventId === props.eventId), eventMouseDownPosition: [e.pageX || e.targetTouches[0].pageX, e.pageY || e.targetTouches[0].pageY] })
    } catch { }

    e.stopPropagation()
  }

  const handleChange = (value) => {
    setEventDialog(undefined)
    const index = props.element[props.eventType].findIndex(i => i.id === props.eventId)
    props.element[props.eventType][index] = value
    Imitation.assignState({ graphContentUpdate: hash(), graphEventUpdate: hash() })
  }

  const handleDelete = (value) => {
    setEventDialog(undefined)
    if (props.eventType === 'monitor') updateTriggerLink(Imitation.state.graphContent, props.event.id)
    props.element[props.eventType] = props.element[props.eventType].filter(i => i.id !== props.eventId)
    Imitation.state.graphEvent = Imitation.state.graphEvent.filter(i => i.elementId !== props.elementId || i.eventId !== props.eventId)
    Imitation.assignState({ graphContentUpdate: hash(), graphEventUpdate: hash() })
  }

  const onClick = () => {
    const params = {}

    params.type = props.eventType
    params.value = props.event

    if (props.eventType === 'monitor') {
      params.monitorOptions = [{ value: '_Use', label: 'Use' }, { value: '_Nonuse', label: 'Nonuse' }, ...information.monitor]
    }

    if (props.eventType === 'trigger') {
      params.triggerOptions = information.trigger
      params.monitorOptionsAll = getMonitorOptionsAll(Imitation.state.graphContent)
    }

    setEventDialog(params)
  }

  return <>
    <Paper
      style={{
        position: 'absolute',
        inset: 0,
        margin: 'auto',
        zIndex: 2,
        width: 240,
        height: 'fit-content',
        padding: 16,
        overflow: 'hidden',
        transform: `translate(${props.translateX}px, ${props.translateY}px) scale(1)`,
        transitionProperty: 'background,height',
        transitionDuration: '0.5s',
        cursor: 'default',
        ...hoverStyle(props.elementId)
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onMouseDown}
    >
      <div style={{ position: 'absolute', right: 4, top: 4, width: 8, height: 8, borderRadius: 4, ...typeStyle() }}></div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginRight: 8 }}>
          {
            props.element.name
          }
        </div>
        <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
          <IconButton size='small'><EditIcon fontSize='small' style={{ fill: 'inherit' }} onClick={() => onClick()} /></IconButton>
        </div>
      </div>

      <Divider style={{ margin: '8px 0' }} />

      <div style={{ opacity: 0.5 }}>
        {
          props.eventType === 'hook' ?
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginRight: 8 }}>
                  {
                    props.event.name
                  }
                </div>
                <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {
                    convertCamelCase(props.event.hookType)
                  }
                </div>
              </div>
            </> : null
        }
        {
          props.eventType === 'monitor' ?
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginRight: 8 }}>
                  {
                    props.event.name
                  }
                </div>
                <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {
                    information.monitor.find(i => i.value === props.event.monitorKey) ? information.monitor.find(i => i.value === props.event.monitorKey).label : null
                  }
                </div>
              </div>
            </> : null
        }
        {
          props.eventType === 'trigger' ?
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', marginRight: 8 }}>
                  {
                    props.event.name
                  }
                </div>
                <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {
                    information.trigger.find(i => i.value === props.event.triggerKey) ? information.trigger.find(i => i.value === props.event.triggerKey).label : '...'
                  }
                </div>
              </div>
            </> : null
        }
      </div>

    </Paper>

    {
      eventDialog ? <EventDialog {...eventDialog} onChange={handleChange} onDelete={handleDelete} onClose={() => setEventDialog(undefined)} /> : null
    }
  </>
}

function Events(props) {
  return props.graphEvent.map(i => <Event key={i.eventType + i.elementId + i.eventId} {...i} />)
}

function App() {
  const [update, setUpdate] = React.useState(0)

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

  const graphEvent = React.useMemo(() => {
    return Imitation.state.graphEvent.map(i => {
      const element = getElementById(Imitation.state.graphContent, i.elementId)
      const event = getEventById(Imitation.state.graphContent, i.eventId, i.eventType)
      return { ...i, element, event }
    })
  }, [Imitation.state.graphEventUpdate, Imitation.state.graphContentUpdate])

  React.useEffect(() => {
    const event = () => setUpdate(pre => pre + 1)

    window.addEventListener('resize', event)

    return () => window.removeEventListener('resize', event)
  }, [])

  React.useEffect(() => {
    if (Imitation.state.eventDevRootRef) setUpdate(pre => pre + 1)
  }, [])

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
      ref={el => Imitation.state.eventDevRootRef = el}
    >
      <Events graphEvent={graphEvent} />
      {
        Imitation.state.eventDevRootRef ?
          <svg style={{ position: 'absolute', inset: 0, margin: 'auto', zIndex: 1 }} width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <Links graphEvent={graphEvent} />
          </svg>
          : null
      }
    </Paper>

    <Paper style={{ position: 'absolute', bottom: 16, left: 0, right: 0, margin: 'auto', width: 480, maxWidth: 'calc(100% - 32px)', padding: '8px 24px' }}>
      <Slider className='font' value={Imitation.state.graphConfig.screenEvent.scale} onChange={(e, v) => { Imitation.state.graphConfig.screenEvent.scale = v; Imitation.assignState({ graphConfigUpdate: hash() }) }} min={0} max={2} step={0.01} valueLabelDisplay='auto' />
    </Paper>

  </Paper>
}

export default Imitation.withBindRender(App, state => [state.graphContentUpdate, state.graphEventUpdate, state.graphConfigUpdate, state.elementHover, state.eventMouseDownTarget, state.eventMouseDownPosition])