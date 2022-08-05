const graphEvent = {
  eventListener: [],
  addEventListener: (props) => {
    const { name, event, env } = props

    const item = { name, event, env }
    graphEvent.eventListener.push(item)
    return () => {
      graphEvent.eventListener = graphEvent.eventListener.filter(i => i !== item)
    }
  },
  dispatchEvent: (props) => {
    const { name, event, env, data } = props

    const resolve = (data) => {
      graphEvent.eventListener.forEach(i => {
        if (i.name === name) {
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

    if (event) {
      try {
        new Function('data', 'env', 'resolve', `(${event})(data, env, resolve)`)(data, env, resolve)
      } catch (err) {
        console.error(err)
      }
    } else {
      resolve(data)
    }
  }
}

export { graphEvent }