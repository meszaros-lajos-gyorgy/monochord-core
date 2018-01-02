/* global describe, it */

import assert from 'assert'

import {
  Either
} from 'ramda-fantasy'

import Big from 'big.js'

import {
  Errors
} from '../../src/math/constants'

import {
  cloneNumber,
  memoizeCalculation,
  number,
  wrapUnary,
  wrapBinary
} from '../../src/math/helpers'

/*
describe('cloneNumber', () => {
  it('', () => {

  })
})

describe('memoizeCalculation', () => {
  it('', () => {

  })
})
*/

// TODO: the tests should not depend on actual Big and Either implementations
describe('number', () => {
  it('returns an instance of Big wrapped in an Either', () => {
    const value = number(10)

    assert.equal(value instanceof Either, true)
    assert.equal(value.value instanceof Big, true)
  })
  it('returns a Left with invalid number error, when given parameter is an invalid number', () => {
    const value = number('apple')
    assert.equal(value.isLeft, true)
    assert.equal(value.value, Errors.INVALID_NUMBER)
  })
  it('returns a Right, when given parameter is a valid number', () => {
    assert.equal(number(100).isRight, true)
  })
  it('returns the input unchanged, if it is a Left', () => {
    const value = Either.Left('x')
    assert.deepEqual(number(value), value)
  })
  it('returns the input unchanged, if it is a Right, holding a Big instance', () => {
    const value = Either.Right(new Big(20))
    assert.deepEqual(number(value), value)
  })
  it('returns a Left with invalid number error, when given parameter is a Right, which doesn\'t hold a Big instance', () => {
    const value = number(Either.Right('x'))
    assert.equal(value.isLeft, true)
    assert.equal(value.value, Errors.INVALID_NUMBER)
  })
})

/*
describe('wrapUnary', () => {
  it('', () => {

  })
})

describe('wrapBinary', () => {
  it('', () => {

  })
})
*/
