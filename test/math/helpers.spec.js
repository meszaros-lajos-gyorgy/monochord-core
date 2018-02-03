/* global describe, it */

import assert from 'assert'

import {
  Either
} from 'ramda-fantasy'

import Decimal from 'decimal.js'

import {
  Errors
} from '../../src/math/constants'

import {
  cloneNumber,
  memoizeCalculation,
  number,
  wrapUnary,
  wrapBinary,
  invert
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

// TODO: the tests should not depend on actual Decimal and Either implementations
describe('number', () => {
  it('returns an instance of Decimal wrapped in an Either', () => {
    const value = number(10)

    assert.equal(value instanceof Either, true)
    assert.equal(value.value instanceof Decimal, true)
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
  it('returns the input unchanged, if it is a Right, holding a Decimal instance', () => {
    const value = Either.Right(new Decimal(20))
    assert.deepEqual(number(value), value)
  })
  it('returns a Left with invalid number error, when given parameter is a Right, which doesn\'t hold a Decimal instance', () => {
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

describe('invert', () => {
  it('takes a function as input and gives back a function', () => {
    const fn = () => Either.Right(true)
    const fn2 = invert(fn)
    assert.equal(typeof fn2, 'function')
  })
  it('gives back a function, which wraps the original function in a way, that when it\'s called, it will return the inverse of the returned value', () => {
    const fn = () => Either.Right(true)
    const fn2 = invert(fn)
    assert.equal(fn().value, true)
    assert.equal(fn2().value, false)
  })
  it('returns back a function\'s result untouched, if it\'s a Left', () => {
    const fn = () => Either.Left(true)
    const fn2 = invert(fn)
    assert.equal(fn().value, true)
    assert.equal(fn2().value, true)
  })
})
