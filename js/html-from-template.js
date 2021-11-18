window.htmlFromTemplate = async (template, data) => {
  const res = await window.fetch(template)
  const str = await res.text()
  let nwStr = str
  for (const key in data) {
    const m = new RegExp('\\{{' + key + '\\}}', 'g')
    nwStr = nwStr.replace(m, data[key])
  }
  return nwStr
}
