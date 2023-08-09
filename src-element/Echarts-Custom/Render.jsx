function Render(props) {
  const React = window.React
  const echarts = window.echarts

  const { compound, property, listen, update } = props

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
  }, [compound.style.width, compound.style.height, compound.style.minWidth, compound.style.minHeight, compound.style.maxWidth, compound.style.maxHeight])

  return <div {...compound} ref={el => ref.current = el} onTransitionEnd={e => resize()}></div>
}

export default Render