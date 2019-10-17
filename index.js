// TODO: Create NPM Package DJI Meta Parser

'use strict'

const markerBegin = '<x:xmpmeta'
const markerEnd = '</x:xmpmeta>'

export let parseDjiMeta = (buffer) => new Promise((resolve, reject) => {
    if (!Buffer.isBuffer(buffer)) reject('Not a Buffer')
    else {
        let data = { raw: {} }
        let offsetBegin = buffer.indexOf(markerBegin)
        if (offsetBegin) {
            let offsetEnd = buffer.indexOf(markerEnd)
            if (offsetEnd) {
                let xmlBuffer = buffer.slice(offsetBegin, offsetEnd + markerEnd.length)
                let parser = require('sax').parser(true)
                // eslint-disable-next-line no-unused-vars
                let nodeName

                parser.onerror = (err) => reject(err)
                parser.onend = () => resolve(data)

                parser.onattribute = function (attr) {
                    data.raw[attr.name] = attr.value
                }
                parser.write(xmlBuffer.toString('utf-8', 0, xmlBuffer.length)).close()
            } else resolve(data)
        } else resolve(data)
    }
})

export default parseDjiMeta
