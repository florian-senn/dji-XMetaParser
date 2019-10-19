import { camelCase } from 'lodash'

const parseText = (text) => new Promise((resolve, reject) => {
  const openTag = '<rdf:Description'
  const endTag = '</rdf:Description>'
  const start = text.indexOf(openTag)
  const end = text.indexOf(endTag)
  const slice = text.slice(start + openTag.length, end)
  const regex = new RegExp('(?<namespace>\\S+):(?<name>\\S+)=["\']?(?<value>[^"]+)["\']?', 'g')
  const attributes = [...slice.matchAll(regex)]
  const result = {}
  const isBool = (value) => value.toLowerCase() === 'true' || value.toLowerCase() === 'false'
  const toBool = (value) => value.toLowerCase() === 'true'
  const sanitizeValue = (value) => {
    if (!isNaN(parseFloat(value))) {
      return parseFloat(value)
    } else if (isBool(value)) {
      return toBool(value)
    } else {
      return value
    }
  }

  for (const attribute of attributes) {
    const value = sanitizeValue(attribute.groups.value)
    const namespace = camelCase(attribute.groups.namespace)
    const name = camelCase(attribute.groups.name)
    result[namespace]
      ? result[namespace][name] = value
      : result[namespace] = { [name]: value }
  }
  resolve(result)
})

export { parseText }
