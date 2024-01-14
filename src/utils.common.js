if (process.env === 'dev') {
  var baseIp = '//localhost'
}
if (process.env === 'prod' || process.env === 'simple') {
  var baseIp = window.location.origin
}

export { baseIp }

const downloadFile = (fileName, content, type) => {
  const aLink = document.createElement('a')
  const evt = document.createEvent("MouseEvents")
  evt.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  aLink.download = fileName
  aLink.href = URL.createObjectURL(new Blob([content], { type: type }))
  aLink.dispatchEvent(evt)
}

const hash = (n = 4, l = 3) => {
  return new Array(l).fill(undefined).map(i => Array.from(Array(n), () => Math.floor(Math.random() * 36).toString(36)).join('')).join('-').toUpperCase()
}

const convertCamelCase = (string) => {
  return string.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

const deleteArrayItem = (target, item) => {
  target.splice(target.indexOf(item), 1)
}

const getElementById = (content, id) => {
  var result = undefined
  var currentContent = content

  while (currentContent.length && result === undefined) {
    const nextContent = []

    currentContent.forEach(i => {
      if (result !== undefined) return
      if (i.id === id) result = i
      if (i.children) Object.values(i.children).forEach(i => nextContent.push(...i))
    })

    currentContent = nextContent
  }

  return result
}

const getElementAndParentById = (content, id) => {
  var result = undefined
  var currentContent = [content]

  while (currentContent.length && result === undefined) {
    const nextContent = []

    currentContent.forEach(i => {
      if (result !== undefined) return
      i.forEach(i_ => {
        if (result !== undefined) return
        if (i_.id === id) result = [i_, i]
        if (i_.children) Object.values(i_.children).forEach(i => nextContent.push(i))
      })
    })

    currentContent = nextContent
  }

  return result
}

const getElementsAll = (content) => {
  var result = []
  var currentContent = content

  while (currentContent.length) {
    const nextContent = []

    currentContent.forEach(i => {
      result.push(i)
      if (i.children) Object.values(i.children).forEach(i => nextContent.push(...i))
    })

    currentContent = nextContent
  }

  return result
}

const copyElement = (target) => {
  var result = JSON.parse(JSON.stringify(target))
  var currentContent = [result]

  while (currentContent.length) {
    const nextContent = []

    currentContent.forEach(i => {
      i.id = hash()
      if (i.hook) i.hook = []
      if (i.monitor) i.monitor = []
      if (i.trigger) i.trigger = []
      if (i.children) Object.values(i.children).forEach(i => nextContent.push(...i))
    })

    currentContent = nextContent
  }

  return result
}

const getMonitorOptionsAll = (content) => {
  var result = []
  var currentContent = content

  while (currentContent.length) {
    const nextContent = []

    currentContent.forEach(i => {
      if (i.monitor) result.push(...i.monitor)
      if (i.children) Object.values(i.children).forEach(i => nextContent.push(...i))
    })

    currentContent = nextContent
  }

  return result
}

const getEventById = (content, id, type) => {
  var result = undefined
  var currentContent = content

  while (currentContent.length && result === undefined) {
    const nextContent = []

    currentContent.forEach(i => {
      if (result !== undefined) return
      if (i[type] && i[type].find(i_ => i_.id === id)) result = i[type].find(i_ => i_.id === id)
      if (i.children) Object.values(i.children).forEach(i => nextContent.push(...i))
    })

    currentContent = nextContent
  }

  return result
}

const updateTriggerLink = (content, id) => {
  var currentContent = content

  while (currentContent.length) {
    const nextContent = []

    currentContent.forEach(i => {
      if (i.trigger) i.trigger.forEach(i => i.linkId = i.linkId.filter(i => i !== id))
      if (i.children) Object.values(i.children).forEach(i => nextContent.push(...i))
    })

    currentContent = nextContent
  }
}

export { downloadFile, hash, convertCamelCase, getElementAndParentById, deleteArrayItem, copyElement, getElementsAll, getMonitorOptionsAll, updateTriggerLink, getElementById, getEventById }
