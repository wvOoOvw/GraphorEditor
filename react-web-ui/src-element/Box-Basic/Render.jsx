import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  if (env === 'dev') {
    return <div {...devParams} style={{ ...style.content }}>
      {
        children && children.content ? children.content(prop) : null
      }
    </div>
  }

  if (env === 'prod') {
    return <div style={{ ...style.content }}>
      {
        children && children.content ? children.content(prop) : null
      }
    </div>
  }
}

export default Render