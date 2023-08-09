const evalEventListenDefault = `function(data, env) {
  const { property, style, flow, update } = env
}`

const evalEventDispatchDefault = `function(data, env, resolve) {
  const { property, style, flow, update, dispatch, event } = env

  resolve(data)
}`

const evalBeforeRenderHook = `function(env) {
  const { property, style, flow } = env
}`

const defaultEventListener = [
  { value: '@setVisibleTrue', label: '显示' },
  { value: '@setVisibleFalse', label: '隐藏' },
]

const defaultEventDispatch = [
  { value: '@onClick', label: '点击' },
  { value: '@onDoubleClick', label: '双击' },
  { value: '@onContextMenu', label: '打开菜单' },
  { value: '@onMouseEnter', label: '鼠标移入' },
  { value: '@onMouseLeave', label: '鼠标移出' },
  { value: '@onMouseMove', label: '鼠标移动' },
  { value: '@onMouseDown', label: '鼠标按下' },
  { value: '@onMouseUp', label: '鼠标松开' },
]

export { evalEventListenDefault, evalEventDispatchDefault, evalBeforeRenderHook, defaultEventListener, defaultEventDispatch }