import React from 'react'

function Render(props) {
  const echarts = window.echarts

  const { event, style, property, monitor, update } = props

  const ref = React.useRef()
  const chartRef = React.useRef()

  React.useEffect(() => {
    chartRef.current = echarts.init(ref.current)
  }, [])

  React.useEffect(() => {
    chartRef.current.setOption(property.option)
  }, [JSON.stringify(property.option)])

  const resize = () => chartRef.current.resize()

  React.useEffect(() => {
    resize()
  }, [event.style.width, event.style.height, event.style.minWidth, event.style.minHeight, event.style.maxWidth, event.style.maxHeight])

  return <div {...event} {...style} ref={el => ref.current = el} onTransitionEnd={e => resize()}></div>
}

export default Render