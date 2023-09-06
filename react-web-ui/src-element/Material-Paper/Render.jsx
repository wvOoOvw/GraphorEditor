import React from 'react'
import { Paper } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  if (env === 'dev') {
    return <Paper {...devParams} {...children.content.devParams} style={{ ...style.content }}>
      {
        children.content(prop)
      }
    </Paper>
  }

  if (env === 'prod') {
    return <Paper style={{ ...style.content }}>
      {
        children.content(prop)
      }
    </Paper>
  }
}

export default Render