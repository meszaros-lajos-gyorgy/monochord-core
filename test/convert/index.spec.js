/* global describe, it */

import assert from 'assert'

import {
  leastFactor,
  getPrimeFactors,
  greatestCommonDivisor,
  getRepeatingDecimal,
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
  it('converts a fraction back to a ratio made out of the smallest possible integers', () => {
    assert.deepEqual(fractionToRatio(1.5), [3, 2])
  })
  it('assigns 1 as denominator to an integer', () => {
    assert.deepEqual(fractionToRatio(4), [4, 1])
    assert.deepEqual(fractionToRatio(7), [7, 1])
  })
})
