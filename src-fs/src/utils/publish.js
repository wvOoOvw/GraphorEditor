const elementOrigin = (content, list = []) => {
  content.forEach(i => {
    if (!list.includes(i.license)) list.push(i.license)

    if (i.children) {
      Object.values(i.children).forEach(i => elementOrigin(i, list))
    }
  })

  return list
}

const styleToClass = (html) => {
  const styleMap = html
    .match(/style=".+?"/g)
    .map(i => i.replace('style="', '')
      .replace('"', ''))
    .reduce((t, i) => {
      if (t.find(i_ => i_.style === i)) {
        return t
      } else {
        const item = { style: i, class: 'S' + Array.from(Array(6), () => Math.floor(Math.random() * 36).toString(36)).join('').toUpperCase() }

        t.push(item)

        return t
      }
    }, [])

  const linkStyle = styleMap.map(i => {
    return `.${i.class}{${i.style}}`
  }).join('')

  var r = html

  r = r.replace('</head>', `<style id="prerender.style">${linkStyle}</style></head>`)

  styleMap.forEach(i => {
    while (r.includes(`style="${i.style}"`)) {
      r = r.replace(`style="${i.style}"`, `class="${i.class}"`)
    }
  })

  return r
}

const simpleify = (content) => {
  const data = JSON.parse(JSON.stringify(content))

  const array = []

  const find = (item) => {
    if (item && typeof item === 'object') {
      if (Array.isArray(item)) {
        item.forEach(i => find(i))
      } else {
        Object.entries(item).forEach(i => {
          const [k, v] = i
          if (!array.includes(k)) array.push(k)
          find(v)
        })
      }
    }
  }

  find(data)

  const map = {}
  const map_ = {}
  array.forEach((i, index) => {
    map[i] = i[0] + index
    map_[i[0] + index] = i
  })

  const rename = (item, map) => {
    if (item && typeof item === 'object') {
      if (Array.isArray(item)) {
        item.forEach(i => rename(i, map))
      } else {
        Object.entries(item).forEach(i => {
          const [k, v] = i
          rename(v, map)
          if (map[k]) {
            item[map[k]] = item[k]
            delete item[k]
          }
        })
      }
    }
  }

  rename(data, map)

  return { data, map: map_ }
}

const resumeify = (content, map) => {
  const data = JSON.parse(JSON.stringify(content))

  const rename = (item, map) => {
    if (item && typeof item === 'object') {
      if (Array.isArray(item)) {
        item.forEach(i => rename(i, map))
      } else {
        Object.entries(item).forEach(i => {
          const [k, v] = i
          rename(v, map)
          if (map[k]) {
            item[map[k]] = item[k]
            delete item[k]
          }
        })
      }
    }
  }

  rename(data, map)

  return data
}

const resumeifyString = "function(content, map) { const data = JSON.parse(JSON.stringify(content)); const rename = (item, map) => { if (item && typeof item === 'object') { if (Array.isArray(item)) { item.forEach(i => rename(i, map)) } else {Object.entries(item).forEach(i => { const [k, v] = i; rename(v, map); if (map[k]) { item[map[k]] = item[k]; delete item[k] } }) } } }; rename(data, map); return data }"

export { elementOrigin, styleToClass, simpleify, resumeify, resumeifyString }