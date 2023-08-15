import { graphEvent } from './utils.graph.event'
import { graphElementSearch } from './utils.graph.common'
import { caculateStyle } from './utils.graph.style'

function ElementRender(props) {
  const React = window.React
  const { graphElement } = window
  const { flow, license, id, property, style, children, monitor, trigger, hook } = props

  const { Render } = React.useMemo(() => graphElementSearch(license, graphElement), [])

  if (!Render) return null

  const [, setUpdate] = React.useState(0)
  const update = () => setUpdate(pre => pre + 1)

  const env = { property, style, flow, update }

  const trigger_exe = React.useMemo(() => {
    if (!trigger) return
    const r = {}
    trigger.forEach(i => {
      if (i.key) return r[i.key] ? r[i.key].push(i) : r[i.key] = [i]
    })
    Object.entries(r).forEach(i => {
      r[i[0]] = (data, $event) => i[1].forEach(i => {
        graphEvent.triggerEvent({ name: i.name, event: i.useEval ? i.event : null, env: { ...env, event: $event }, data })
      })
    })
    return r
  }, [property, style, flow, trigger])

  env.trigger = trigger_exe

  const monitor_exe = React.useMemo(() => {
    if (!monitor) return
    const r = {}
    monitor.filter(i => !i.useEval).forEach(i => i.key && r[i.key] ? r[i.key].push(i) : r[i.key] = [i])
    Object.entries(r).forEach(i => {
      r[i[0]] = (event) => {
        const remove = i[1].map(i => {
          return graphEvent.addEventMonitor({ name: i.name, event, env })
        })
        return () => remove.forEach(i => i())
      }
    })
    return r
  }, [property, style, flow, monitor])

  React.useEffect(() => {
    if (!monitor) return
    const remove = [
      ...monitor.filter(i => i.useEval).map(i => {
        return graphEvent.addEventMonitor({ name: i.name, event: i.event, env })
      }),
      ...monitor.filter(i => i.key === '@setVisibleTrue').map(i => {
        return graphEvent.addEventMonitor({ name: i.name, event: v => { style.hidden = false; update() } })
      }),
      ...monitor.filter(i => i.key === '@setVisibleFalse').map(i => {
        return graphEvent.addEventMonitor({ name: i.name, event: v => { style.hidden = true; update() } })
      }),
    ]
    return () => remove.forEach(i => i())
  }, [property, style, flow, monitor])

  const hookEnv = { property, style, flow }

  if (hook.useBeforeRenderHook) {
    try {
      new Function('env', `(${hook.beforeRenderHook})(env)`)(hookEnv)
    } catch (err) {
      console.error(err)
    }
  }

  const children_exe = React.useMemo(() => {
    if (!children) return
    const r = {}
    Object.entries(children).forEach(i => {
      r[i[0]] = (prop) => i[1].map(i => <ElementRender key={i.id} flow={prop ? prop : flow} {...i} />)
    })
    return r
  }, [children, flow])

  const compound = {
    style: { ...caculateStyle(style), boxSizing: 'border-box' }
  }

  if (trigger_exe['@onClick']) compound.onClick = e => trigger_exe['@onClick'](undefined, e)
  if (trigger_exe['@onDoubleClick']) compound.onDoubleClick = e => trigger_exe['@onDoubleClick'](undefined, e)
  if (trigger_exe['@onMouseEnter']) compound.onMouseEnter = e => trigger_exe['@onMouseEnter'](undefined, e)
  if (trigger_exe['@onMouseLeave']) compound.onMouseLeave = e => trigger_exe['@onMouseLeave'](undefined, e)
  if (trigger_exe['@onMouseMove']) compound.onMouseMove = e => trigger_exe['@onMouseMove'](undefined, e)
  if (trigger_exe['@onMouseDown']) compound.onMouseDown = e => trigger_exe['@onMouseDown'](undefined, e)
  if (trigger_exe['@onMouseUp']) compound.onMouseUp = e => trigger_exe['@onMouseUp'](undefined, e)
  if (trigger_exe['@onTouchMove']) compound.onTouchMove = e => trigger_exe['@onTouchMove'](undefined, e)
  if (trigger_exe['@onTouchStart']) compound.onTouchStart = e => trigger_exe['@onTouchStart'](undefined, e)
  if (trigger_exe['@onTouchEnd']) compound.onTouchEnd = e => trigger_exe['@onTouchEnd'](undefined, e)

  const Render_exe = <Render
    compound={compound}
    style={style}
    property={property}
    monitor={monitor_exe}
    trigger={trigger_exe}
    children={children_exe}
    env={'prod'}
    update={update}
    id={id}
  />

  if (style.use === false) return null

  return Render_exe
}

function App() {
  const React = window.React
  const { graphContent, graphConfig } = window

  const [update, setUpdate] = React.useState(0)

  if (graphConfig.project.updateId) {
    window[graphConfig.project.updateId] = () => setUpdate(pre => pre + 1)
  }

  return graphContent.map(i => <ElementRender key={i.id} {...i} />)
}

export default App