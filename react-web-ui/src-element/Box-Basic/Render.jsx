import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  if (env === 'dev') {
    return <div {...devParams} style={{ ...style.main }}>
      {
        children && children.main ? children.main(prop) : null
      }
    </div>
  }

  if (env === 'prod') {
    return <div style={{ ...style.main }}>
      {
        children && children.main ? children.main(prop) : null
      }
    </div>
  }
}

export default Render