/* eslint-disable no-console */
import { parseText } from '../lib/index'

const source = 'example1.jpg'
fetch(source)
  .then(response => response.blob())
  .then(blob => blob.text())
  .then(text => parseText(text))
  .then(metadata => {
    console.log(metadata)
  })
  .catch()
  .finally()
