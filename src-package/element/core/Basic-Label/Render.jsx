function Render(props) {
  const React = window.React

  const { compound, children, pure } = props

  return <label {...compound}>
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