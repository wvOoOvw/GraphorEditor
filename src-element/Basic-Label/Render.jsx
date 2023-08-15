import React from 'react'

function Render(props) {

  const { event, children, pure } = props

  return <label {...event}>
    <div style={{ display: 'none' }}>
      {
        pure && children && children.main ? children.input() : null
      }
    </div>
    {
      children && children.main ? children.main() : null
    }
  </label>
}

export default Render