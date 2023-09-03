if (process.env === 'dev') {
  var baseIp = '//localhost'
}
if (process.env === 'prod' || process.env === 'simple') {
  var baseIp = window.location.origin
}

export { baseIp }

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

const hash = (n = 4, l = 3) => {
  return new Array(l).fill(undefined).map(i => Array.from(Array(n), () => Math.floor(Math.random() * 36).toString(36)).join('')).join('-').toUpperCase()
}

function convertCamelCase(string) {
  return string.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const deepSearch = (target, key, value) => {
  var current = undefined
  var parent = undefined

  target.forEach(i => {
    if (i[key] === value) [current, parent] = current && parent ? [current, parent] : [i, target]

    if (i.children) {
      Object.values(i.children).forEach(i => [current, parent] = current && parent ? [current, parent] : deepSearch(i, key, value))
    }
  })

  return [current, parent]
}

const deleteArrayItem = (target, item) => {
  const index = target.indexOf(item)
  if (index > -1) target.splice(index, 1)
}

const deepCopyElement = (target) => {
  const deepCopyElementHelp = (t) => {
    t.id = hash()
    if (t.children) Object.values(t.children).forEach(i => {
      i.forEach(i => deepCopyElementHelp(i))
    })
    return t
  }

  return deepCopyElementHelp(JSON.parse(JSON.stringify(target)))
}

const getElementsAll = (content) => {
  const r = []

  content.forEach(i => {
    if (i) r.push(i)

    if (i.children) {
      Object.values(i.children).forEach(i => r.push(...getElementAll(i)))
    }
  })

  return r
}

const getMonitorOptionsAll = (content) => {
  const r = []

  content.forEach((i) => {
    if (i.monitor) r.push(...i.monitor)

    if (i.children) {
      Object.values(i.children).forEach(i => r.push(...getMonitorOptionsAll(i)))
    }
  })

  return r
}

const getElementById = (target, id) => {
  var current = undefined

  target.forEach(i => {
    if (i.id === id) current = current ? current : i

    if (i.children) {
      Object.values(i.children).forEach(i => current = current ? current : getElementById(i, id))
    }
  })

  return current
}

const getEventById = (target, id, type) => {
  var current = undefined

  target.forEach(i => {
    if (i[type]) current = current ? current : i[type].find(i_ => i_.id === id)

    if (i.children) {
      Object.values(i.children).forEach(i => current = current ? current : getEventById(i, id, type))
    }
  })

  return current
}

const updateTriggerLink = (content, pre, current) => {
  content.forEach((i) => {
    if (i.trigger) {
      i.trigger.forEach(i => {
        if (i.monitorName === pre) i.monitorName = current
      })
    }
    if (i.children) {
      Object.values(i.children).forEach(i => {
        getMonitorOptionsAll(i)
      })
    }
  })
}

const graphElementSearch = (license, list) => {
  const item = list.find(i => i.license.key === license)
  if (item) {
    return item
  } else {
    return { Render: null, Edit: null, View: null, information: null, license: null }
  }
}

export { downloadFile, clone, copy, hash, convertCamelCase, deepSearch, deleteArrayItem, deepCopyElement, getElementsAll, getMonitorOptionsAll, updateTriggerLink, graphElementSearch, getElementById, getEventById }
