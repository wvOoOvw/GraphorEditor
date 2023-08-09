function Render(props) {
  const React = window.React
  const { CircularProgress } = window.MaterialUI

  const { compound, property } = props

  return <div {...compound}>
    <CircularProgress style={{ color: property.color }} size={Number(property.size)} thickness={Number(property.thickness)} />
  </div>
}

export default Render