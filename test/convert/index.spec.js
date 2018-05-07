/* global describe, it */

import assert from 'assert'

import {
  fractionToCents,
  centsToFraction
} from '../../src/convert/index'

describe('fractionToCents', () => {
  it('converts a fraction to cents', () => {
    assert.equal(fractionToCents(1), 0)
    assert.equal(fractionToCents(2), 1200)
  })
})

describe('centsToFraction', () => {
  it('converts cents to fraction', () => {
    assert.equal(centsToFraction(0), 1)
    assert.equal(centsToFraction(1200), 2)
  })
})
