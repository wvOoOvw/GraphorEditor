function Render(props) {
  const React = window.React
  const { CircularProgress } = window.MaterialUI

  const { compound, inner } = props

  return <div {...compound}>
    <CircularProgress style={{ color: inner.color }} size={Number(inner.size)} thickness={Number(inner.thickness)} />
  </div>
}

export default Render