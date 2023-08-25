import React from 'react'
import Hls from 'hls.js'

function Render(props) {
  const { env, update, params, property, monitor, trigger, children, element } = props

  React.useEffect(() => {
    if (monitor && monitor.setSrc) {
      const remove = monitor.setSrc(data => {
        property.src = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const ref = React.useRef()

  React.useEffect(() => {
    if (property.src.endsWith('.m3u8')) {
      const hls = new Hls()
      hls.loadSource(property.src)
      hls.attachMedia(ref.current)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (property.autoplay) ref.current.play()
      })

      return () => {
        hls.destroy()
      }
    }
  }, [property.src])

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

  const onEnded = e => {
    if (trigger && trigger.onEnded) trigger.onEnded(undefined, e)
  }

  return <video
    {...params}
    ref={el => ref.current = el}
    src={property.src}
    poster={property.poster}
    controls={property.controls}
    autoPlay={property.autoplay}
    loop={property.loop}
    onEnded={onEnded}
  />
}

export default Render