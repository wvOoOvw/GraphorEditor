import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  if (env === 'dev') {
    return <label {...devParams} {...children.content.devParams} style={{ ...style.content }}>
      {
        children.content(prop)
      }
    </label>
  }

  if (env === 'prod') {
    return <label style={{ ...style.content }}>
      <div style={{ display: 'none' }}>
        {
          children.invisibleInput(prop)
        }
      </div>
      {
        children.content(prop)
      }
    </label>
  }
}

export default Render