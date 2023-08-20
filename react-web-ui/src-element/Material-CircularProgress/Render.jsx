import React from 'react'
import { CircularProgress } from '@mui/material'

function Render(props) {
  const { event, style, property } = props

  return <CircularProgress {...event} {...style} size={Number(property.size)} thickness={Number(property.thickness)} />
}

export default Render