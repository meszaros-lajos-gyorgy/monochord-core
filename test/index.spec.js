import monochordCore from '../src/index.js'
import assert from 'assert'

/* global describe, it */

describe('monochord core', () => {
  it('test() is defined', () => {
    assert.ok(monochordCore.test, 'should be defined')
  })
})
