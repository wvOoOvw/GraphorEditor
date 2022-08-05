const graphElementSearch = (license, list) => {
  const item = list.find(i => i.license.key === license)
  if (item) {
    return item
  } else {
    return { Render: null, Edit: null, View: null, information: null, license: null }
  }
}

export { graphElementSearch }