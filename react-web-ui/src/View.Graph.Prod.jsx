import React from 'react'

import { graphEvent } from './utils.graph.event'
import { searchElement } from './utils.common'
import { caculateStyle } from './utils.graph.style'

function ElementRender(props) {
  const graphElement = window.graphElement

  const { prop } = props

  const { license, id, use, property, style, children, monitor, trigger, hook } = props.element

  const { Render } = React.useMemo(() => searchElement(license, graphElement), [])

  if (!Render) return null

  const [, setUpdate] = React.useState(0)
  const update = () => setUpdate(pre => pre + 1)

  const env = { property, style, prop, update }

  const trigger_exe = React.useMemo(() => {
    if (!trigger) return
    const r = {}
    trigger.filter(i => i.use && i.triggerKey).forEach(i => {
      r[i.triggerKey] ? r[i.triggerKey].push(i) : r[i.triggerKey] = [i]
    })
    Object.entries(r).forEach(i => {
      r[i[0]] = (data, $event) => i[1].forEach(i => {
        i.linkId.forEach(linkId => {
          graphEvent.triggerEvent({ id: linkId, event: i.triggerType === 'eval' ? i.triggerEval : undefined, env: { ...env, event: $event }, data })
        })
      })
    })
    return r
  }, [property, style, prop, trigger])

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
          return graphEvent.addEventMonitor({ id: i.id, event, env })
        })
        return () => remove.forEach(i => i())
      }
    })
    return r
  }, [property, style, prop, monitor])

  React.useEffect(() => {
    if (!monitor) return
    const remove = [
      ...monitor.filter(i => i.use && i.monitorType === 'eval').map(i => {
        return graphEvent.addEventMonitor({ id: i.id, event: i.monitorEval, env })
      }),
      ...monitor.filter(i => i.use && i.monitorType === 'default' && i.monitorKey === '_Use').map(i => {
        return graphEvent.addEventMonitor({ id: i.id, event: v => { props.element.use = false; update() } })
      }),
      ...monitor.filter(i => i.use && i.monitorType === 'default' && i.monitorKey === '_Nonuse').map(i => {
        return graphEvent.addEventMonitor({ id: i.id, event: v => { props.element.use = true; update() } })
      }),
    ]
    return () => remove.forEach(i => i())
  }, [property, style, prop, monitor])

  const hookEnv = { property, style, prop }

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
      r[i[0]] = (prop) => i[1].map(i => <ElementRender key={i.id} element={i} prop={prop} />)
    })
    return r
  }, [children])

  const style_exe = React.useMemo(() => {
    if (!style) return
    const r = {}
    Object.entries(style).forEach(i => {
      r[i[0]] = caculateStyle(i[1])
    })
    return r
  })

  if (use === false) return null

  return <Render env='prod' update={update} element={props.element} property={property} style={style_exe} children={children_exe} monitor={monitor_exe} trigger={trigger_exe} prop={prop} />
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