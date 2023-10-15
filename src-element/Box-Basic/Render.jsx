import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  if (env === 'dev') {
    return <div {...devParams} {...children.content.devParams} style={{ ...style.content }}>
      {
        children.content(prop)
      }
    </div>
  }

  if (env === 'prod') {
    return <div style={{ ...style.content }}>
      {
        children.content(prop)
      }
    </div>
  }
}

export default Render