import React from 'react'

function Render(props) {
  const { property, monitor, trigger } = props

  React.useEffect(() => {
    if (monitor && monitor.request) {
      const remove = monitor.request(data => {
        if (property.mode === 'fetch') fetch_exe(data)
        if (property.mode === 'xhr') xhr_exe(data)
      })
      return () => { remove() }
    }
  }, [])

  const preHandlParams = (data) => {
    var method = data && data.method ? data.method.toUpperCase() : property.method.toUpperCase()

    var body
    if (data && data.body && property.bodyType === 'json') body = JSON.stringify(data.body)
    if (data && data.body && property.bodyType === 'formdata') {
      const formData = new FormData()
      Object.entries(data.body).forEach(i => formData.append(i[0], i[1]))
      body = formData
    }

    var headers = data && data.headers ? data.headers : {}

    var url = property.baseUrl ? property.baseUrl : ''
    if (data && data.url) url = url + data.url

    if (data && data.query && typeof data.query === 'string') url = url + '?' + data.query
    if (data && data.query && typeof data.query === 'object') {
      const query = Object.entries(data.query).map(i => i[0] + '=' + i[1])
      url = url + '?' + query.join('&')
    }

    return { method, url, body, headers }
  }

  const fetch_exe = (data) => {
    const { method, url, body, headers } = preHandlParams(data)
    const param = { method, headers, body }

    fetch(url, param)
      .then(res => {
        if (trigger && trigger.onResponse) {
          try {
            res.json().then(res => trigger.onResponse(res))
          } catch {
            trigger.onResponse(res)
          }
        }
      })
      .catch(err => {
        if (trigger && trigger.onError) trigger.onError(err)
      })
  }

  const xhr_exe = (data) => {
    const { method, url, body, headers } = preHandlParams(data)

    const xhrINS = new XMLHttpRequest()
    xhrINS.onreadystatechange = () => {
      if (xhrINS.readyState === 4) {
        if (xhrINS.status == 200) {
          trigger.onResponse(JSON.parse(xhrINS.responseText))
        } else {
          trigger.onError(JSON.parse(xhrINS.responseText))
        }
      }
    }
    xhrINS.open(method, url, true)
    if (headers) {
      Object.entries(headers).forEach(i => {
        xhrINS.setRequestHeader(i[0], i[1])
      })
    }
    xhrINS.send(body)
  }

  return null
}

export default Render