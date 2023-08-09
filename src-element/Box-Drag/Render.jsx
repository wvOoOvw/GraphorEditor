function Render(props) {
  const React = window.React

  const { compound, property, dispatch, children } = props

  const dragEvent = {
    onDrag: (e) => {
      if (dispatch && dispatch.onDrag) dispatch.onDrag(undefined, e)
    },
    onDragStart: (e) => {
      if (dispatch && dispatch.onDragStart) dispatch.onDragStart(undefined, e)
    },
    onDragLeave: (e) => {
      if (dispatch && dispatch.onDragLeave) dispatch.onDragLeave(undefined, e)
    },
    onDragOver: (e) => {
      if (dispatch && dispatch.onDragOver) dispatch.onDragOver(undefined, e)
    },
    onDragEnter: (e) => {
      if (dispatch && dispatch.onDragEnter) dispatch.onDragEnter(undefined, e)
    },
    onDragEnd: (e) => {
      if (dispatch && dispatch.onDragEnd) dispatch.onDragEnd(undefined, e)
    },
    onDrop: (e) => {
      if (dispatch && dispatch.onDrop) dispatch.onDrop(undefined, e)
    },
  }

  return <div {...compound} {...dragEvent} draggable={property.draggable}>
    {
      children && children.main ? children.main() : null
    }
  </div>
}

export default Render