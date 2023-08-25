import React from 'react'
import { CircularProgress } from '@mui/material'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

  return <CircularProgress {...params} size={Number(property.size)} thickness={Number(property.thickness)} />
}

export default Render