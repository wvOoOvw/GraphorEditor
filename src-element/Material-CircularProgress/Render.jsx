import React from 'react'

function Render(props) {
  const { CircularProgress } = window.MaterialUI

  const { event, property } = props

  return <div {...event}>
    <CircularProgress style={{ color: property.color }} size={Number(property.size)} thickness={Number(property.thickness)} />
  </div>
}

export default Render