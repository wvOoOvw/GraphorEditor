import React from 'react'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

  const ref = React.useRef()

  React.useEffect(() => {
    if (monitor && monitor.setSrc) {
      const remove = monitor.setValue(data => {
        property.src = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (env === 'prod' && property.src) {
      const script = document.createElement('script')
      script.src = property.src
      document.getElementsByTagName('head')[0].appendChild(script)
    }
  }, [property.src])

  if (env === 'dev') {
    return <div {...params}></div>
  }

  if (env === 'prod') {
    return <div {...params} id={property.id} ref={el => ref.current = el}></div>
  }
}

export default Render