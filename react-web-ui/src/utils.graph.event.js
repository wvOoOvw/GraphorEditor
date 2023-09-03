const graphEvent = {
  event: [],
  addEventMonitor: (props) => {
    const { id, event, env } = props

    const item = { id, event, env }
    graphEvent.event.push(item)
    return () => {
      graphEvent.event = graphEvent.event.filter(i => i !== item)
    }
  },
  triggerEvent: (props) => {
    const { id, event, env, data } = props

    const resolve = (data) => {
      graphEvent.event.forEach(i => {
        if (i.id === id) {
          if (typeof i.event === 'function') i.event(data, i.env)
          if (typeof i.event === 'string') {
            try {
              new Function('data', 'env', `(${i.event})(data, env)`)(data, i.env)
            } catch (err) {
              console.error(err)
            }
          }
        }
      })
    }

    if (event !== undefined) {
      try {
        new Function('data', 'env', 'resolve', `(${event})(data, env, resolve)`)(data, env, resolve)
      } catch (err) {
        console.error(err)
      }
    }

    if (event === undefined) {
      resolve(data)
    }
  }
}

export { graphEvent }