import React from 'react'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element, prop } = props

  const ref = React.useRef()

  const onEnded = e => {
    if (trigger && trigger.onEnded) trigger.onEnded(undefined, e)
  }

  React.useEffect(() => {
    if (monitor && monitor.setSrc) {
      const remove = monitor.setSrc(data => {
        property.src = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.setPlay) {
      const remove = monitor.setPlay(data => {
        ref.current.play()
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (monitor && monitor.setPause) {
      const remove = monitor.setPause(data => {
        ref.current.pause()
        update()
      })
      return () => { remove() }
    }
  }, [])

  if (env === 'dev') {
    return <span {...params}>Video</span>
  }

  if (env === 'prod') {
    return <video {...params} ref={el => ref.current = el} src={property.src} poster={property.poster} controls={property.controls} autoPlay={property.autoplay} loop={property.loop} onEnded={onEnded} />
  }
}

export default Render