/* global describe, it */

import assert from 'assert'

import {
  leastFactor,
  getPrimeFactors,
  toCounterPairs,
  addToCounterPairs,
  concatCounters,
  setOperationWithRepeats,
  intersectionWithRepeats,
  unionWithRepeats,
  findGreatestCommonDivisor,
  findLeastCommonMultiple,
  getRepeatingDecimal,
  fractionToCents,
  centsToFraction,
  ratioToFraction,
  fractionToRatio
} from '../../src/convert/index'

describe('leastFactor', () => {
  it('finds a given integers lowest divisor', () => {
    assert.equal(leastFactor(10), 2)
    assert.equal(leastFactor(81), 3)
  })
  it('returns NaN, when given number is not a valid integer', () => {
    assert.equal(isNaN(leastFactor('eee')), true)
    assert.equal(isNaN(leastFactor(Infinity)), true)
    assert.equal(isNaN(leastFactor(false)), true)
    assert.equal(isNaN(leastFactor(6.8)), true)
  })
})
describe('getPrimeFactors', () => {
  it('breaks a number up into it\'s prime factors', () => {
    assert.deepEqual(getPrimeFactors(20), [2, 2, 5])
    assert.deepEqual(getPrimeFactors(7), [7])
  })
  it('changes the first factor to negative, when given number is negative', () => {
    assert.deepEqual(getPrimeFactors(-20), [-2, 2, 5])
  })
  it('returns NaN, when given number is not a valid integer', () => {
    assert.deepEqual(getPrimeFactors('eee'), [])
    assert.deepEqual(getPrimeFactors(Infinity), [])
    assert.deepEqual(getPrimeFactors(false), [])
    assert.deepEqual(getPrimeFactors(6.8), [])
  })
})

describe('toCounterPairs', () => {
  it('wraps every value into an array and adds a zero after it', () => {
    assert.deepEqual(toCounterPairs([2, 3, 5]), [[2, 0], [3, 0], [5, 0]])
  })
})
describe('addToCounterPairs', () => {
  it('increases the counter for the corresponding element', () => {
    assert.deepEqual(addToCounterPairs([[2, 0], [3, 0]], 2), [[2, 1], [3, 0]])
  })
})
describe('concatCounters', () => {
  it('joins the counters of two counter pairs together', () => {
    assert.deepEqual(concatCounters([2, 3], [2, 0]), [2, [3, 0]])
  })
})
describe('setOperationWithRepeats', () => {
  // TODO: add tests
})
describe('intersectionWithRepeats', () => {
  it('finds every common element between 2 arrays', () => {
    assert.deepEqual(intersectionWithRepeats([2, 2, 3, 2], [5, 2, 2, 2]), [2, 2, 2])
  })
})
describe('unionWithRepeats', () => {
  it('finds every common element between 2 arrays, plus the differring ones', () => {
    assert.deepEqual(unionWithRepeats([2, 2, 3, 2], [5, 2, 2, 2]), [2, 2, 2, 3, 5])
  })
})
describe('findGreatestCommonDivisor', () => {
  it('finds the largest number, which divides all given numbers', () => {
    assert.equal(findGreatestCommonDivisor([35, 55, 95]), 5)
    assert.equal(findGreatestCommonDivisor([10, 20]), 10)
    assert.equal(findGreatestCommonDivisor([200, 48, 80]), 8)
  })
})
describe('findLeastCommonMultiple', () => {
  it('finds the lowest number, which is the multiple of all given numbers', () => {
    assert.equal(findLeastCommonMultiple([6, 8]), 24)
    assert.equal(findLeastCommonMultiple([65, 10, 5]), 130)
  })
})
describe('getRepeatingDecimal', () => {
  it('finds the repetition inside a fraction\'s decimals', () => {
    assert.equal(getRepeatingDecimal(10/3), '3')
  })
  it('aligns the repetition based on how the decimals end', () => {
    assert.equal(getRepeatingDecimal(0.931931931), '931')
    assert.equal(getRepeatingDecimal(0.9319319319), '319')
  })
})

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
