import fetch from 'isomorphic-fetch'

const markerBegin = '<x:xmpmeta'
const markerEnd = '</x:xmpmeta>'

const sourceToBuffer = (src) => new Promise((resolve, reject) => {
  fetch(src)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => {
      const buffer = Buffer.alloc(arrayBuffer.byteLength)
      const view = new Uint8Array(arrayBuffer)
      for (let i = 0; i < buffer.length; ++i) {
        buffer[i] = view[i]
      }
      return buffer
    })
})

const parseDjiMeta = (input) => new Promise((resolve, reject) => {
  const buffer = sourceToBuffer(input)
  if (!Buffer.isBuffer(buffer)) {
    reject(new Error('DJI-XMetaParser: Can\'t create buffer'))
  } else {
    const data = {}
    const offsetBegin = buffer.indexOf(markerBegin)
    if (offsetBegin) {
      const offsetEnd = buffer.indexOf(markerEnd)
      if (offsetEnd) {
        const xmlBuffer = buffer.slice(offsetBegin, offsetEnd + markerEnd.length)
        console.log(xmlBuffer.toString('utf-8', 0, xmlBuffer.length))
        const parser = require('sax').parser(true)
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

export { parseDjiMeta }
