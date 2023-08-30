import React from 'react'
import Hls from 'hls.js'

function Render(props) {
  const { env, update, devParams, property, style, monitor, trigger, children, element, prop } = props

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
    return <video {...devParams} style={{ ...style.main }} ref={el => ref.current = el} src={property.src} poster={property.poster} controls={property.controls} autoPlay={property.autoplay} loop={property.loop} />
  }

  if (env === 'prod') {
    React.useEffect(() => {
      if (property.src.endsWith('.m3u8') === false) return

      const hls = new Hls()

      hls.loadSource(property.src)
      hls.attachMedia(ref.current)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (property.autoplay) ref.current.play()
      })

      return () => hls.destroy()
    }, [property.src])

    return <video style={{ ...style.main }} ref={el => ref.current = el} src={property.src} poster={property.poster} controls={property.controls} autoPlay={property.autoplay} loop={property.loop} onEnded={onEnded} />
  }
}

export default Render