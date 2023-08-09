function Render(props) {
  const React = window.React

  const { inner, listen, dispatch } = props

  React.useEffect(() => {
    if (listen && listen.setRequest) {
      const remove = listen.setRequest(data => {
        if (inner.mode === 'fetch') fetch_exe(data)
        if (inner.mode === 'xhr') xhr_exe(data)
      })
      return () => { remove() }
    }
  }, [])

  const preHandlParams = (data) => {
    var method = data && data.method ? data.method.toUpperCase() : inner.method.toUpperCase()

    var body
    if (data && data.body && inner.bodyType === 'json') body = JSON.stringify(data.body)
    if (data && data.body && inner.bodyType === 'formdata') {
      const formData = new FormData()
      Object.entries(data.body).forEach(i => formData.append(i[0], i[1]))
      body = formData
    }

    var headers = data && data.headers ? data.headers : {}

    var url = inner.baseUrl ? inner.baseUrl : ''
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
        if (dispatch && dispatch.onResponse) {
          try {
            res.json().then(res => dispatch.onResponse(res))
          } catch {
            dispatch.onResponse(res)
          }
        }
      })
      .catch(err => {
        if (dispatch && dispatch.onError) dispatch.onError(err)
      })
  }

  const xhr_exe = (data) => {
    const { method, url, body, headers } = preHandlParams(data)

    const xhrINS = new XMLHttpRequest()
    xhrINS.onreadystatechange = () => {
      if (xhrINS.readyState === 4) {
        if (xhrINS.status == 200) {
          dispatch.onResponse(JSON.parse(xhrINS.responseText))
        } else {
          dispatch.onError(JSON.parse(xhrINS.responseText))
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