/* global describe, it */

import assert from 'assert'

import {
  Either
} from 'ramda-fantasy'

import {
  isDivisableBy,
  smallestFactor,
  getPrimeFactors,
  findGreatestCommonDivisor,
  findLeastCommonMultiple
} from '../../src/math/advanced'

import {
  number
} from '../../src/math/helpers'

import {
  Errors
} from '../../src/math/constants/errors'

describe('isDivisableBy', () => {
  it('returns the leftmost Left parameter, when any of the parameters is a Left', () => {
    const incorrect = number('asf')
    const correct = number(3)

    assert.equal(isDivisableBy(incorrect, correct), incorrect)
    assert.equal(isDivisableBy(correct, incorrect), incorrect)
  })
  it('returns true, when the 1st parameter can divide the 2nd without any remainders', () => {
    const result = isDivisableBy(number(3), number(9))
    assert.equal(result.isRight, true)
    assert.equal(result.value, true)
  })
  it('returns false, when the 1st parameter cannot divide the 2nd without any remainders', () => {
    const result = isDivisableBy(number(3), number(4))
    assert.equal(result.isRight, true)
    assert.equal(result.value, false)
  })
  it('can be curried', () => {
    const a = number(3)
    const b = number(9)
    assert.equal(isDivisableBy(a, b).value, true)
    assert.equal(isDivisableBy(a, b).value, isDivisableBy(a)(b).value)
  })
})

describe('smallestFactor', () => {
  it('returns the given parameter as is, if it\'s a Left', () => {
    const value = Either.Left('asd')
    assert.equal(smallestFactor(value), value)
  })
  it('returns 1, when given number is 1', () => {
    assert.equal(smallestFactor(number(1)).value.toString(), '1')
  })
  it('returns the smallest factor of a given number', () => {
    assert.equal(smallestFactor(number(24)).value.toString(), '2')
    assert.equal(smallestFactor(number(39)).value.toString(), '3')
    assert.equal(smallestFactor(number(7)).value.toString(), '7')
    assert.equal(smallestFactor(number(45)).value.toString(), '3')
    assert.equal(smallestFactor(number(149)).value.toString(), '149')
    assert.equal(smallestFactor(number(121)).value.toString(), '11')
  })
})

describe('getPrimeFactors', () => {
  it('returns the given parameter as is, if it\'s a Left', () => {
    const value = Either.Left('asd')
    assert.equal(getPrimeFactors(value), value)
  })
  it('returns an array of factors of the given parameter', () => {
    const num = number(28)
    const factors = getPrimeFactors(num)

    assert.equal(factors.length, 3)
    assert.equal(factors[0].value.toString(), '2')
    assert.equal(factors[1].value.toString(), '2')
    assert.equal(factors[2].value.toString(), '7')
  })
  it('returns only the given number itself in the array, if it is a prime', () => {
    const num = number(107)
    const factors = getPrimeFactors(107)
    assert.equal(factors.length, 1)
    assert.equal(factors[0].value.toString(), '107')
  })
  it('changes the first factor to negative, when given number is negative', () => {
    const num = number(-18)
    const factors = getPrimeFactors(num)

    assert.equal(factors.length, 3)
    assert.equal(factors[0].value.toString(), '-2')
    assert.equal(factors[1].value.toString(), '3')
    assert.equal(factors[2].value.toString(), '3')
  })
  it('returns an "integer required" error, when given number is not an integer', () => {
    const result = getPrimeFactors(number('1.145'))
    assert.equal(result.isLeft, true)
    assert.equal(result.value, Errors.INTEGER_REQUIRED)
  })
})

/*
describe('findGreatestCommonDivisor', () => {

})
*/

/*
describe('findLeastCommonMultiple', () => {

})
*/
