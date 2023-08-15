import React from 'react'

function Render(props) {
  const { event, children, env } = props

  return <label {...event}>
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