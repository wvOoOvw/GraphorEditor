function Render(props) {
  const React = window.React

  const Hls = window.Hls

  const { compound, property, listen, update } = props

  React.useEffect(() => {
    if (listen && listen.setSrc) {
      const remove = listen.setSrc(data => {
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
    if (listen && listen.setPlay) {
      const remove = listen.setPlay(data => {
        ref.current.play()
        update()
      })
      return () => { remove() }
    }
  }, [])

  React.useEffect(() => {
    if (listen && listen.setPause) {
      const remove = listen.setPause(data => {
        ref.current.pause()
        update()
      })
      return () => { remove() }
    }
  }, [])

  const onEnded = e => {
    if (dispatch && dispatch.onEnded) dispatch.onEnded(undefined, e)
  }

  return <video
    {...compound}
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