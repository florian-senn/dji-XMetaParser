import sax from 'sax'

const createBuffer = (promise) => new Promise((resolve, reject) => {
  // if (someCondition) reject(new Error())
  promise
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
      const buffer = Buffer.alloc(arrayBuffer.byteLength)
      const view = new Uint8Array(arrayBuffer)
      for (let i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i]
      }
      resolve(buffer)
    })
})

const parseDjiMeta = (buffer) => new Promise((resolve, reject) => {
  const markerBegin = '<x:xmpmeta'
  const markerEnd = '</x:xmpmeta>'
  if (!Buffer.isBuffer(buffer)) {
    reject(new Error('DJI-XMetaParser: Can\'t create buffer'))
  } else {
    const data = {}
    const offsetBegin = buffer.indexOf(markerBegin)
    if (offsetBegin) {
      const offsetEnd = buffer.indexOf(markerEnd)
      if (offsetEnd) {
        const xmlBuffer = buffer.slice(offsetBegin, offsetEnd + markerEnd.length)
        const parser = sax.parser
        // eslint-disable-next-line no-unused-vars
        let nodeName

        parser.onerror = (err) => reject(err)
        parser.onend = () => resolve(data)

        parser.onattribute = function (attr) {
          data.raw[attr.name] = attr.value
        }
        parser.write(xmlBuffer.toString('utf-8', 0, xmlBuffer.length)).close()
      } else {
        resolve(data)
      }
    } else {
      resolve(data)
    }
  }
})

export { parseDjiMeta, createBuffer }
