const parseText = (text) => new Promise((resolve, reject) => {
  const openTag = '<rdf:Description'
  const endTag = '</rdf:Description>'
  const start = text.indexOf(openTag)
  const end = text.indexOf(endTag)
  const slice = text.slice(start + openTag.length, end)
  const regex = new RegExp('(?<namespace>\\S+):(?<name>\\S+)=["\']?(?<value>[^"]+)["\']?', 'g')
  const attributes = [...slice.matchAll(regex)]
  const result = {}

  for (const attribute of attributes) {
    const value = attribute.groups.value
    result[attribute.groups.namespace]
      ? result[attribute.groups.namespace][attribute.groups.name] = isNaN(parseFloat(value)) ? value : parseFloat(value)
      : result[attribute.groups.namespace] = { [attribute.groups.name]: isNaN(parseFloat(value)) ? value : parseFloat(value) }
  }
  resolve(result)
})

export { parseText }
