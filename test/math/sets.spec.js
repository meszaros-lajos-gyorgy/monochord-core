/* global describe, it */

import assert from 'assert'

import {
  Either
} from 'ramda-fantasy'

import {
  number
} from '../../src/math/helpers'

import {
  toCounterPairs,
  addToCounterPairs,
  concatCounter,
  concatCounters,
  /*
  setOperationWithRepeats,
  intersectionWithRepeats,
  unionWithRepeats
  */
} from '../../src/math/sets'

describe('toCounterPairs', () => {
  it('returns the given array as is, when it contains one or more Lefts', () => {
    const list = [Either.Left(1), Either.Right(2), Either.Right(3)]
    assert.deepEqual(toCounterPairs(list), list)
  })
  it('wraps every element of the given array into an array and appends a zero after each', () => {
    const list = [number(1), number(2), number(3)]
    const result = toCounterPairs(list)

    assert.equal(result.length, 3)
    
    assert.equal(Array.isArray(result[0]), true)
    assert.equal(Array.isArray(result[1]), true)
    assert.equal(Array.isArray(result[2]), true)
    
    assert.equal(result[0].length, 2)
    assert.equal(result[1].length, 2)
    assert.equal(result[2].length, 2)

    assert.equal(result[0][0], list[0])
    assert.equal(result[1][0], list[1])
    assert.equal(result[2][0], list[2])

    assert.equal(result[0][1].value.toString(), '0')
    assert.equal(result[1][1].value.toString(), '0')
    assert.equal(result[2][1].value.toString(), '0')
  })
})

describe('addToCounterPairs', () => {
  it('increases the 2nd value for a counter pair, which\'s first value matches the given number', () => {
    const list = [[number(2), number(0)], [number(3), number(0)], [number(5), number(0)]]
    const result = addToCounterPairs(list, 3)
    
    assert.equal(result.length, 3)
    assert.deepEqual(result[0], list[0])
    assert.deepEqual(result[2], list[2])
    
    assert.equal(result[1][0], list[1][0])
    assert.equal(result[1][1].value.toString(), '1')
  })
  it('returns the given array as is, when it contains one or more Lefts', () => {
    const list = [number(1), number('cat'), number(3)]
    assert.deepEqual(addToCounterPairs(list, 3), list)
  })
})

describe('concatCounter', () => {
  it('takes 2 single counter pairs and creates an array, which contains the common number and an array of the counts ', () => {
    const cntr1 = [number(2), number(0)]
    const cntr2 = [number(2), number(3)]

    const result = concatCounter(cntr1, cntr2)

    assert.equal(result.length, 2)
    assert.equal(result[0].value.toString(), '2')
    assert.equal(Array.isArray(result[1]), true)
    assert.equal(result[1].length, 2)
    assert.equal(result[1][0].value.toString(), '0')
    assert.equal(result[1][1].value.toString(), '3')
  })
})

describe('concatCounters', () => {
  it('returns the given array as is, when it contains one or more Lefts', () => {
    const list = [[Either.Left(1), Either.Right(2)], [Either.Right(3), Either.Right(4)]]
    assert.deepEqual(concatCounters(list), list)
  })
  // [[2, 0], [3, 2], [5, 0]] + [[2, 3], [3, 1], [5, 1]] -> [[2, [0, 3]], [3, [2, 1]], [5, [0, 1]]]
})

/*
describe('setOperationWithRepeats', () => {
  it('', () => {

  })
})

describe('intersectionWithRepeats', () => {
  it('', () => {

  })
})

describe('unionWithRepeats', () => {
  it('', () => {

  })
})
*/
