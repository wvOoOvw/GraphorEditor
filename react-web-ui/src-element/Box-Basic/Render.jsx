import React from 'react'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

  return <div {...params}>
    {
      children && children.main ? children.main(prop) : null
    }
  </div>
}

export default Render