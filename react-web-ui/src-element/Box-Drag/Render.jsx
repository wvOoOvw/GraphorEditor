import React from 'react'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

  const dragProps = {
    onDrag: (e) => {
      if (trigger && trigger.onDrag) trigger.onDrag(undefined, e)
    },
    onDragStart: (e) => {
      if (trigger && trigger.onDragStart) trigger.onDragStart(undefined, e)
    },
    onDragLeave: (e) => {
      if (trigger && trigger.onDragLeave) trigger.onDragLeave(undefined, e)
    },
    onDragOver: (e) => {
      if (trigger && trigger.onDragOver) trigger.onDragOver(undefined, e)
    },
    onDragEnter: (e) => {
      if (trigger && trigger.onDragEnter) trigger.onDragEnter(undefined, e)
    },
    onDragEnd: (e) => {
      if (trigger && trigger.onDragEnd) trigger.onDragEnd(undefined, e)
    },
    onDrop: (e) => {
      if (trigger && trigger.onDrop) trigger.onDrop(undefined, e)
    },
    draggable: property.draggable
  }

  if (env === 'dev') {
    return <div {...devParams} style={{ ...style.content }}>
      {
        children && children.content ? children.content(prop) : null
      }
    </div>
  }

  if (env === 'prod') {
    return <div style={{ ...style.content }} {...dragProps}>
      {
        children && children.content ? children.content(prop) : null
      }
    </div>
  }
}

export default Render