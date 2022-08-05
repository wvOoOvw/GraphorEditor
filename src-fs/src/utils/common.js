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

export { downloadFile, copy }