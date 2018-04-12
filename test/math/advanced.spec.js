/* global describe, it */

import assert from 'assert'

import {
  findGreatestCommonDivisor,
  findLeastCommonMultiple
} from '../../src/math/advanced'

import {
  number
} from '../../src/math/helpers'

describe('findGreatestCommonDivisor', () => {
  it('returns the leftmost Left parameter, when any of the parameters is a Left', () => {
    const incorrect = number('asf')
    const correct = number(3)

    assert.equal(findGreatestCommonDivisor(incorrect, correct), incorrect)
    assert.equal(findGreatestCommonDivisor(correct, incorrect), incorrect)
  })
  /*
  it('', () => {

  })
  */
  it('can be curried', () => {
    const a = number(3)
    const b = number(9)
    assert.equal(findGreatestCommonDivisor(a, b).value.toString(), findGreatestCommonDivisor(a)(b).value.toString())
  })
})

describe('findLeastCommonMultiple', () => {
  it('returns the leftmost Left parameter, when any of the parameters is a Left', () => {
    const incorrect = number('asf')
    const correct = number(3)

    assert.equal(findLeastCommonMultiple(incorrect, correct), incorrect)
    assert.equal(findLeastCommonMultiple(correct, incorrect), incorrect)
  })
  /*
  it('', () => {

  })
  */
  it('can be curried', () => {
    const a = number(3)
    const b = number(9)
    assert.equal(findLeastCommonMultiple(a, b).value.toString(), findLeastCommonMultiple(a)(b).value.toString())
  })
})
