import React from 'react'

function Render(props) {
  const { event, style, children, env } = props

  return <label {...event} {...style}>
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