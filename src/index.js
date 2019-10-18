import sax from 'sax'

const createBuffer = (arrayBuffer) => new Promise((resolve, reject) => {
  // if (someCondition) reject(new Error())
  console.log(arrayBuffer)
  if (arrayBuffer instanceof ArrayBuffer) {
    const buffer = Buffer.alloc(arrayBuffer.byteLength)
    const view = new Uint8Array(arrayBuffer)
    for (let i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i]
    }
    console.log(buffer)
    resolve(buffer)
  } else {
    reject(new Error('DJI-XMetaParser, createBuffer: Input isn\'t ArrayBuffer, can\'t create Buffer'))
  }
})

const parseDjiMeta = (buffer) => new Promise((resolve, reject) => {
  const markerBegin = '<x:xmpmeta'
  const markerEnd = '</x:xmpmeta>'
  if (!Buffer.isBuffer(buffer)) {
    reject(new Error('DJI-XMetaParser: Input isn\'t buffer. Can\'t parse metadata'))
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
