import React from 'react'
import { CircularProgress } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  if (env === 'dev') {
    return <CircularProgress {...devParams} size={Number(property.size)} thickness={Number(property.thickness)} />
  }

  if (env === 'prod') {
    return <CircularProgress size={Number(property.size)} thickness={Number(property.thickness)} />
  }
}

export default Render