if (process.env === 'dev') {
  // var baseIp = '//localhost'
  // var baseIp = '//192.168.1.3'
  var baseIp = '//124.222.36.246'
}
if (process.env === 'prod' || process.env === 'simple') {
  var baseIp = window.location.origin
}

const baseUrl = baseIp + '/api/graph'

export { baseIp, baseUrl }

const downloadFile = (fileName, content) => {
  const aLink = document.createElement('a')
  const evt = document.createEvent("MouseEvents")
  evt.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  aLink.download = fileName
  aLink.href = URL.createObjectURL(new Blob([content], { type: 'text/json' }))
  aLink.dispatchEvent(evt)
}

const copy = (v, callback) => {
  const input = document.createElement('input')
  document.body.appendChild(input)
  input.setAttribute('value', v)
  input.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    callback()
  }
  document.body.removeChild(input)
}

const clone = (t, useJson) => {
  if (useJson) return JSON.parse(JSON.stringify(t))

  if (t && typeof t === 'object') {
    return Object.entries(t).reduce((l, i) => { l[i[0]] = clone(i[1]); return l }, Array.isArray(t) ? [] : {})
  } else {
    return t
  }
}

const deepSearch = (target, key, value) => {
  var current = undefined
  var parent = undefined
  target.forEach(i => {
    if (current && parent) return
    if (i[key] === value) {
      current = i
      parent = target
      return
    }
    if (i.children) {
      Object.values(i.children).forEach(i => {
        const r = deepSearch(i, key, value)
        if (r && r[0] && r[1]) {
          current = r[0]
          parent = r[1]
        }
      })
    }
  })
  return [current, parent]
}

const deleteArrayItem = (target, item) => {
  const index = target.indexOf(item)
  if (index > -1) target.splice(index, 1)
}

const deepCopyElementHelp = (t) => {
  t.id = hash()
  if (t.children) Object.values(t.children).forEach(i => {
    i.forEach(i => deepCopyElementHelp(i))
  })
}

const deepCopyElement = (target) => {
  const result = clone(target, true)
  deepCopyElementHelp(result)
  return result
}

const getEventName = (content) => {
  return content.reduce((t, i) => {
    if (i.listen) {
      i.listen.forEach(i => {
        if (i.name && !t.includes(i.name)) t.push(i.name)
      })
    }
    if (i.children) {
      Object.values(i.children).forEach(i => {
        t.push(...getEventName(i))
      })
    }
    return t
  }, [])
}

const hash = (n = 4, l = 3) => {
  return new Array(l).fill(undefined).map(i => Array.from(Array(n), () => Math.floor(Math.random() * 36).toString(36)).join('')).join('-').toUpperCase()
}

const graphElementSearch = (license, list) => {
  const item = list.find(i => i.license.key === license)
  if (item) {
    return item
  } else {
    return { Render: null, Edit: null, View: null, information: null, license: null }
  }
}

export { downloadFile, clone, copy, deepSearch, deleteArrayItem, deepCopyElement, getEventName, hash, graphElementSearch }
