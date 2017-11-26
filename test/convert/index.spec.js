/* global describe, it */

import assert from 'assert'

import {
  fractionToCents,
  centsToFraction,
  ratioToFraction,
  fractionToRatio
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

describe('ratioToFraction', () => {
  it('converts a ratio to a fraction', () => {
    assert.equal(ratioToFraction(3, 2), 1.5)
  })
})

describe('fractionToRatio', () => {

})
