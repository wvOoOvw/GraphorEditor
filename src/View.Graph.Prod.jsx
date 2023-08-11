import { graphEvent } from './utils.graph.event'
import { graphElementSearch } from './utils.graph.common'
import { graphOuterStyle } from './utils.graph.style'

function ElementRender(props) {
  const React = window.React
  const { graphElement } = window
  const { flow, license, id, property, style, children, listen, dispatch, hook } = props

  const { Render } = React.useMemo(() => graphElementSearch(license, graphElement), [])

  if (!Render) return null

  const [, setUpdate] = React.useState(0)
  const update = () => setUpdate(pre => pre + 1)

  const env = { property, style, flow, update }

  const dispatch_exe = React.useMemo(() => {
    if (!dispatch) return
    const r = {}
    dispatch.forEach(i => {
      if (i.key) return r[i.key] ? r[i.key].push(i) : r[i.key] = [i]
    })
    Object.entries(r).forEach(i => {
      r[i[0]] = (data, $event) => i[1].forEach(i => {
        graphEvent.dispatchEvent({ name: i.name, event: i.useEval ? i.event : null, env: { ...env, event: $event }, data })
      })
    })
    return r
  }, [property, style, flow, dispatch])

  env.dispatch = dispatch_exe

  const listen_exe = React.useMemo(() => {
    if (!listen) return
    const r = {}
    listen.filter(i => !i.useEval).forEach(i => i.key && r[i.key] ? r[i.key].push(i) : r[i.key] = [i])
    Object.entries(r).forEach(i => {
      r[i[0]] = (event) => {
        const remove = i[1].map(i => {
          return graphEvent.addEventListener({ name: i.name, event, env })
        })
        return () => remove.forEach(i => i())
      }
    })
    return r
  }, [property, style, flow, listen])

  React.useEffect(() => {
    if (!listen) return
    const remove = [
      ...listen.filter(i => i.useEval).map(i => {
        return graphEvent.addEventListener({ name: i.name, event: i.event, env })
      }),
      ...listen.filter(i => i.key === '@setVisibleTrue').map(i => {
        return graphEvent.addEventListener({ name: i.name, event: v => { style.hidden = false; update() } })
      }),
      ...listen.filter(i => i.key === '@setVisibleFalse').map(i => {
        return graphEvent.addEventListener({ name: i.name, event: v => { style.hidden = true; update() } })
      }),
    ]
    return () => remove.forEach(i => i())
  }, [property, style, flow, listen])

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
    style: { ...graphOuterStyle(style), boxSizing: 'border-box' }
  }

  if (dispatch_exe['@onClick']) compound.onClick = e => dispatch_exe['@onClick'](undefined, e)
  if (dispatch_exe['@onDoubleClick']) compound.onDoubleClick = e => dispatch_exe['@onDoubleClick'](undefined, e)
  if (dispatch_exe['@onMouseEnter']) compound.onMouseEnter = e => dispatch_exe['@onMouseEnter'](undefined, e)
  if (dispatch_exe['@onMouseLeave']) compound.onMouseLeave = e => dispatch_exe['@onMouseLeave'](undefined, e)
  if (dispatch_exe['@onMouseMove']) compound.onMouseMove = e => dispatch_exe['@onMouseMove'](undefined, e)
  if (dispatch_exe['@onMouseDown']) compound.onMouseDown = e => dispatch_exe['@onMouseDown'](undefined, e)
  if (dispatch_exe['@onMouseUp']) compound.onMouseUp = e => dispatch_exe['@onMouseUp'](undefined, e)
  if (dispatch_exe['@onTouchMove']) compound.onTouchMove = e => dispatch_exe['@onTouchMove'](undefined, e)
  if (dispatch_exe['@onTouchStart']) compound.onTouchStart = e => dispatch_exe['@onTouchStart'](undefined, e)
  if (dispatch_exe['@onTouchEnd']) compound.onTouchEnd = e => dispatch_exe['@onTouchEnd'](undefined, e)

  const Render_exe = <Render
    compound={compound}
    style={style}
    property={property}
    listen={listen_exe}
    dispatch={dispatch_exe}
    children={children_exe}
    pure={true}
    update={update}
    id={id}
  />

  if (style.render === false) return null

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