window.loadData = async (path) => {
  // convert a csv file into an array
  // modified from: https://stackoverflow.com/a/1293163/1104148
  function csv2arr (strData, strDelimiter) {
    strDelimiter = (strDelimiter || ',')
    const pattern = '(\\' + strDelimiter + '|\\r?\\n|\\r|^)' + // Delimiters.
      '(?:"([^"]*(?:""[^"]*)*)"|' + // Quoted fields.
      '([^"\\' + strDelimiter + '\\r\\n]*))' // Standard fields.
    const objPattern = new RegExp((pattern), 'gi')
    const arrData = [[]]
    let arrMatches = objPattern.exec(strData)
    while (arrMatches) {
      const strMatchedDelimiter = arrMatches[1]
      if (strMatchedDelimiter.length &&
        strMatchedDelimiter !== strDelimiter) {
        arrData.push([])
      }
      let strMatchedValue
      if (arrMatches[2]) {
        strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"')
      } else {
        strMatchedValue = arrMatches[3]
      }
      arrData[arrData.length - 1].push(strMatchedValue)
      arrMatches = objPattern.exec(strData)
    }
    return (arrData)
  }

  // create extention-aware fetch request (assumes only .csv or .json)
  // return data as javascript object
  const arr = path.split('.')
  const ext = arr[arr.length - 1]
  const typ = (ext === 'csv') ? 'text' : 'json'
  const res = await window.fetch(path)
  const dat = await res[typ]()
  if (ext === 'csv') {
    const rows = csv2arr(dat)
    const keys = rows.shift()
    // remove trailing empty row caused by an extra
    // linebreak at the end of the csv file
    const last = rows[rows.length - 1]
    if (last.length === 1 && last[0] === '') rows.pop()
    // convert CSV to JSON
    const json = []
    rows.forEach(row => {
      const obj = {}
      row.forEach((item, i) => { obj[keys[i]] = item })
      json.push(obj)
    })
    return json
  } else {
    return dat
  }
}
