function Render(props) {
  const React = window.React

  const Hls = window.Hls

  const { compound, inner, listen, update } = props

  React.useEffect(() => {
    if (listen && listen.setSrc) {
      const remove = listen.setSrc(data => {
        inner.src = data
        update()
      })
      return () => { remove() }
    }
  }, [])

  const ref = React.useRef()

  React.useEffect(() => {
    if (inner.src.endsWith('.m3u8')) {
      const hls = new Hls()
      hls.loadSource(inner.src)
      hls.attachMedia(ref.current)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (inner.autoplay) ref.current.play()
      })

      return () => {
        hls.destroy()
      }
    }
  }, [inner.src])

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
    src={inner.src}
    poster={inner.poster}
    controls={inner.controls}
    autoPlay={inner.autoplay}
    loop={inner.loop}
    onEnded={onEnded}
  />
}

export default Render