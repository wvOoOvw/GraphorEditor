import React from 'react'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

  if (env === 'dev') {
    return <label {...params}>
      {
        children && children.main ? children.main(prop) : null
      }
    </label>
  }

  if (env === 'prod') {
    return <label {...params}>
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