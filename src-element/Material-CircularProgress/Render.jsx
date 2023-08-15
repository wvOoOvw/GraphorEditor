import React from 'react'
import { CircularProgress } from '@mui/material'

function Render(props) {
  const { event, property } = props

  return <CircularProgress {...event} style={{ color: property.color }} size={Number(property.size)} thickness={Number(property.thickness)} />
}

export default Render