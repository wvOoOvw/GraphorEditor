import React from 'react'
import { Paper } from '@mui/material'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  if (env === 'dev') {
    return <Paper {...devParams} style={{ ...style.content }}>
      {
        children && children.content ? children.content(prop) : null
      }
    </Paper>
  }

  if (env === 'prod') {
    return <Paper style={{ ...style.content }}>
      {
        children && children.content ? children.content(prop) : null
      }
    </Paper>
  }
}

export default Render