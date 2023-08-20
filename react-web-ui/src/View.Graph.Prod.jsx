import React from 'react'

import { graphEvent } from './utils.graph.event'
import { graphElementSearch } from './utils.graph.common'
import { caculateStyle } from './utils.graph.style'

function ElementRender(props) {
  const graphElement = window.graphElement

  const { flow, license, id, use, property, style, children, monitor, trigger, hook } = props.element

  const { Render } = React.useMemo(() => graphElementSearch(license, graphElement), [])

  if (!Render) return null

  const [, setUpdate] = React.useState(0)
  const update = () => setUpdate(pre => pre + 1)

  const env = { property, style, flow, update }

  const trigger_exe = React.useMemo(() => {
    if (!trigger) return
    const r = {}
    trigger.filter(i => i.use && i.triggerKey).forEach(i => {
      r[i.triggerKey] ? r[i.triggerKey].push(i) : r[i.triggerKey] = [i]
    })
    Object.entries(r).forEach(i => {
      r[i[0]] = (data, $event) => i[1].forEach(i => {
        graphEvent.triggerEvent({ name: i.monitorName, event: i.triggerKey === 'eval' ? i.triggerEval : undefined, env: { ...env, event: $event }, data })
      })
    })
    return r
  }, [property, style, flow, trigger])

  env.trigger = trigger_exe

  const monitor_exe = React.useMemo(() => {
    if (!monitor) return
    const r = {}
    monitor.filter(i => i.use && i.monitorKey && i.monitorType === 'default').forEach(i => {
      r[i.monitorKey] ? r[i.monitorKey].push(i) : r[i.monitorKey] = [i]
    })
    Object.entries(r).forEach(i => {
      r[i[0]] = (event) => {
        const remove = i[1].map(i => {
          return graphEvent.addEventMonitor({ name: i.monitorName, event, env })
        })
        return () => remove.forEach(i => i())
      }
    })
    return r
  }, [property, style, flow, monitor])

  React.useEffect(() => {
    if (!monitor) return
    const remove = [
      ...monitor.filter(i => i.use && i.monitorType === 'eval').map(i => {
        return graphEvent.addEventMonitor({ name: i.monitorName, event: i.monitorEval, env })
      }),
      ...monitor.filter(i => i.use && i.monitorType === 'default' && i.monitorKey === '@setUseTrue').map(i => {
        return graphEvent.addEventMonitor({ name: i.monitorName, event: v => { props.element.use = false; update() } })
      }),
      ...monitor.filter(i => i.use && i.monitorType === 'default' && i.monitorKey === '@setUseFalse').map(i => {
        return graphEvent.addEventMonitor({ name: i.monitorName, event: v => { props.element.use = true; update() } })
      }),
    ]
    return () => remove.forEach(i => i())
  }, [property, style, flow, monitor])

  const hookEnv = { property, style, flow }

  hook.forEach(i => {
    if (i.use === false) return

    if (i.hookType === 'beforeRender') {
      try {
        new Function('env', `(${i.hookEval})(env)`)(hookEnv)
      } catch (err) {
        console.error(err)
      }
    }
  })

  const children_exe = React.useMemo(() => {
    if (!children) return
    const r = {}
    Object.entries(children).forEach(i => {
      r[i[0]] = (prop) => i[1].map(i => <ElementRender key={i.id} flow={prop ? prop : flow} element={i} />)
    })
    return r
  }, [children, flow])

  const event = {}

  if (trigger_exe['@onClick']) event.onClick = e => trigger_exe['@onClick'](undefined, e)
  if (trigger_exe['@onDoubleClick']) event.onDoubleClick = e => trigger_exe['@onDoubleClick'](undefined, e)
  if (trigger_exe['@onMouseEnter']) event.onMouseEnter = e => trigger_exe['@onMouseEnter'](undefined, e)
  if (trigger_exe['@onMouseLeave']) event.onMouseLeave = e => trigger_exe['@onMouseLeave'](undefined, e)
  if (trigger_exe['@onMouseMove']) event.onMouseMove = e => trigger_exe['@onMouseMove'](undefined, e)
  if (trigger_exe['@onMouseDown']) event.onMouseDown = e => trigger_exe['@onMouseDown'](undefined, e)
  if (trigger_exe['@onMouseUp']) event.onMouseUp = e => trigger_exe['@onMouseUp'](undefined, e)
  if (trigger_exe['@onTouchMove']) event.onTouchMove = e => trigger_exe['@onTouchMove'](undefined, e)
  if (trigger_exe['@onTouchStart']) event.onTouchStart = e => trigger_exe['@onTouchStart'](undefined, e)
  if (trigger_exe['@onTouchEnd']) event.onTouchEnd = e => trigger_exe['@onTouchEnd'](undefined, e)

  const style_exe = {
    style: { ...caculateStyle(style), boxSizing: 'border-box' }
  }

  const Render_exe = <Render
    event={event}
    style={style_exe}
    property={property}
    monitor={monitor_exe}
    trigger={trigger_exe}
    children={children_exe}
    env={'prod'}
    update={update}
    id={id}
  />

  if (use === false) return null

  return Render_exe
}

function App() {
  const graphContent = window.graphContent
  const graphConfig = window.graphConfig

  const [update, setUpdate] = React.useState(0)

  if (graphConfig.project.updateId) {
    window[graphConfig.project.updateId] = () => setUpdate(pre => pre + 1)
  }

  return graphContent.map(i => <ElementRender key={i.id} element={i} />)
}

export default App