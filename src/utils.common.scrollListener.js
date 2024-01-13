const scrollListener = (node, enable) => {
  var timeRef = undefined
  var rectRef = undefined

  const r = []

  if (node === undefined) return () => r.forEach(i => i())

  const resize = () => {
    rectRef = node.getBoundingClientRect()
  }

  resize()

  window.addEventListener('resize', resize)

  r.push(() => () => window.removeEventListener('resize', resize))

  if (enable === false) return () => r.forEach(i => i())

  const mousemove = (e) => {
    const top = e.clientY > rectRef.top && e.clientY < (rectRef.top + 10)
    const bottom = e.clientY < rectRef.bottom && e.clientY > (rectRef.bottom - 10)

    if (top === false && bottom === false) {
      cancelAnimationFrame(timeRef)
      timeRef = undefined
    }

    if (top === true && timeRef === undefined) {
      const loop = () => {
        timeRef = requestAnimationFrame(() => {
          node.scrollTop = node.scrollTop - 1
          loop()
        })
      }
      loop()
    }

    if (bottom === true && timeRef === undefined) {
      const loop = () => {
        timeRef = requestAnimationFrame(() => {
          node.scrollTop = node.scrollTop + 1
          loop()
        })
      }
      loop()
    }
  }

  window.addEventListener('mousemove', mousemove);

  r.push(() => () => window.removeEventListener('mousemove', mousemove))

  return () => r.forEach(i => i())
}

export { scrollListener }