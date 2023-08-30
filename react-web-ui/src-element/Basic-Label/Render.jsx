import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  if (env === 'dev') {
    return <label {...devParams} style={{ ...style.main }}>
      {
        children && children.main ? children.main(prop) : null
      }
    </label>
  }

  if (env === 'prod') {
    return <label style={{ ...style.main }}>
      <div style={{ display: 'none' }}>
        {
          env && children && children.main ? children.input(prop) : null
        }
      </div>
      {
        children && children.main ? children.main(prop) : null
      }
    </label>
  }
}

export default Render