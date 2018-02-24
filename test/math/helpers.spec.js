/* global describe, it */

import assert from 'assert'

import {
  always
} from 'ramda'

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
  invert,
  ifThenElse
} from '../../src/math/helpers'

describe('cloneNumber', () => {
  it('clones the number inside a Right', () => {
    const numA = Either.Right(Decimal(12))
    const numB = cloneNumber(numA)
    assert.notEqual(numA.value, numB.value)
  })
  it('leaves the input intact, if given input is a Left', () => {
    const input = Either.Left('this is an error')
    const output = cloneNumber(input)
    assert.equal(input, output)
  })
})

describe('memoizeCalculation', () => {
  it('takes a function as input and gives back a function', () => {
    const fn = () => Either.Right(true)
    const fn2 = memoizeCalculation(fn)
    assert.equal(typeof fn2, 'function')
  })
  it('gives back a function, which wraps the original function in a way, that when it\'s called, it will store the result for the inputs and only execute the original function once', () => {
    let cntr = 0
    const fn = (a, b) => {
      cntr++
      return Either.Right(a + b)
    }
    const fn2 = memoizeCalculation(fn)

    fn2(1, 2)
    fn2(1, 2)
    fn2(1, 2)
    assert.equal(cntr, 1)

    fn(1, 2)
    fn(1, 2)
    fn(1, 2)
    assert.equal(cntr, 4)
  })
  it('returns back a cloned version of the passed function\'s result, when it\'s a number', () => {
    let value
    const fn = (a, b) => {
      value = Either.Right(a + b)
      return value
    }
    const fn2 = memoizeCalculation(fn)
    const memoizedValue = fn2(1, 2)

    assert.equal(memoizedValue.value.toString(), value.value.toString())
    assert.notEqual(memoizedValue.value, value)
  })
  it('stores a different cache for same arguments in different orders', () => {
    let cntr = 0
    const fn = (a, b) => {
      cntr++
      return Either.Right(a + b)
    }
    const fn2 = memoizeCalculation(fn)

    fn2(1, 2)
    fn2(2, 1)
    fn2(1, 2)
    fn2(2, 1)
    fn2(1, 2)
    fn2(2, 1)
    assert.equal(cntr, 2)
  })
  it('returns back a function\'s result untouched, if it\'s a Left', () => {
    const fn = () => Either.Left(true)
    const fn2 = memoizeCalculation(fn)
    assert.equal(fn().value, true)
    assert.equal(fn2().value, true)
  })
})

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

describe('ifThenElse', () => {
  const T = () => Either.Right(true)
  const F = () => Either.Right(false)

  it('takes 3 functions as inputs and returns a function, which executes the 1st function and calles the 2nd on a truthy value and the 3rd otherwise', () => {
    const truthy = always(number(4))
    const falsy = always(number(20))
    const result = ifThenElse(T, truthy, falsy)(1, 2)

    assert.equal(result.value.toString(), truthy().value.toString())
  })
  // TODO: add more tests
})
