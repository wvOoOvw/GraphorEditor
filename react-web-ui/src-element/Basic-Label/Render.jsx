import React from 'react'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element } = props

  return <label {...params}>
    <div style={{ display: 'none' }}>
      {
        env && children && children.main ? children.input() : null
      }
    </div>
    {
      children && children.main ? children.main() : null
    }
  </label>
}

export default Render