import { expect } from 'chai'
import { parseDjiMeta } from '../src'
import testJpg1 from './test1.jpg'

describe('Image to Metadata Object', () => {
  it('should create a object containing metadata', () => {
    const expectedVal = {
    }
    expect(parseDjiMeta(testJpg1).to.have.members(expectedVal))
  })
})
