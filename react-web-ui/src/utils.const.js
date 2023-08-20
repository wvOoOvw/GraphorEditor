const evalEventMonitorDefault = `function(data, env) {
  const { property, style, flow, update } = env
}`

const evalEventTriggerDefault = `function(data, env, resolve) {
  const { property, style, flow, update, trigger, event } = env

  resolve(data)
}`

const evalBeforeRenderHook = `function(env) {
  const { property, style, flow } = env
}`

const defaultEventMonitor = [
  { value: '@setUseTrue', label: '显示' },
  { value: '@setUseFalse', label: '隐藏' },
]

const defaultEventTrigger = [
  { value: '@onClick', label: 'click' },
  { value: '@onDoubleClick', label: 'double click' },
  { value: '@onContextMenu', label: '打开菜单' },
  { value: '@onMouseEnter', label: '鼠标移入' },
  { value: '@onMouseLeave', label: '鼠标移出' },
  { value: '@onMouseMove', label: '鼠标移动' },
  { value: '@onMouseDown', label: '鼠标按下' },
  { value: '@onMouseUp', label: '鼠标松开' },
]

export { evalEventMonitorDefault, evalEventTriggerDefault, evalBeforeRenderHook, defaultEventMonitor, defaultEventTrigger }