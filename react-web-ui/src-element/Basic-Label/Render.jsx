import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  if (env === 'dev') {
    return <label {...devParams} style={{ ...style.content }}>
      {
        children && children.content ? children.content(prop) : null
      }
    </label>
  }

  if (env === 'prod') {
    return <label style={{ ...style.content }}>
      <div style={{ display: 'none' }}>
        {
          env && children && children.invisibleInput ? children.invisibleInput(prop) : null
        }
      </div>
      {
        children && children.content ? children.content(prop) : null
      }
    </label>
  }
}

export default Render