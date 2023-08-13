function Render(props) {
  const React = window.React

  const { compound, property, trigger, children } = props

  const dragEvent = {
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
  }

  return <div {...compound} {...dragEvent} draggable={property.draggable}>
    {
      children && children.main ? children.main() : null
    }
  </div>
}

export default Render