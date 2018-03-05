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
  groupCountsWith,
  expandCounters,
  setOperationWithRepeats,
  intersectionWithRepeats,
  topWithRepeats
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
  it('takes 2 single counter pairs and creates an array, which contains the common number and an array of the counts', () => {
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
  it('returns the leftmost invalid array as is, when any of the given arrays contain one or more Lefts', () => {
    const a = [[Either.Left(1), Either.Right(2)], [Either.Right(3), Either.Right(4)]]
    const b = [[Either.Right(5), Either.Right(6)], [Either.Right(7), Either.Right(8)]]
    
    assert.deepEqual(concatCounters(a, b), a)
    assert.deepEqual(concatCounters(b, a), a)
  })
  it('combines each counter pair from both arrays, so that the resulting array will contain arrays, in which the first element will be the common number, followed by the array of counts', () => {
    const a = [[number(2), number(0)], [number(3), number(2)], [number(5), number(0)]]
    const b = [[number(2), number(3)], [number(3), number(1)], [number(5), number(1)]]
    
    const result = concatCounters(a, b)
    
    assert.equal(result.length, 3)
    
    assert.equal(Array.isArray(result[0]), true)
    assert.equal(Array.isArray(result[1]), true)
    assert.equal(Array.isArray(result[2]), true)

    assert.equal(result[0].length, 2)
    assert.equal(result[1].length, 2)
    assert.equal(result[2].length, 2)

    assert.equal(result[0][0].value.toString(), '2')
    assert.equal(result[1][0].value.toString(), '3')
    assert.equal(result[2][0].value.toString(), '5')

    assert.equal(Array.isArray(result[0][1]), true)
    assert.equal(Array.isArray(result[1][1]), true)
    assert.equal(Array.isArray(result[2][1]), true)

    assert.equal(result[0][1].length, 2)
    assert.equal(result[1][1].length, 2)
    assert.equal(result[2][1].length, 2)
    
    assert.equal(result[0][1][0].value.toString(), '0')
    assert.equal(result[0][1][1].value.toString(), '3')
    assert.equal(result[1][1][0].value.toString(), '2')
    assert.equal(result[1][1][1].value.toString(), '1')
    assert.equal(result[2][1][0].value.toString(), '0')
    assert.equal(result[2][1][1].value.toString(), '1')
  })
})

describe('groupCountsWith', () => {
  it('returns the given array as is, when it contains one or more Lefts', () => {
    const cntr = [[Either.Left(1), Either.Right(2)], [Either.Right(3), Either.Right(4)]]
    assert.equal(groupCountsWith(() => {}, cntr), cntr)
  })
  it('takes a function and an array of counter pairs and calls the function with the counters\' amounts', () => {
    const cntrs = [[number(2), [number(0), number(3)]], [number(3), [number(2), number(1)]], [number(5), [number(0), number(1)]]]

    const calls = []
    const fn = (a, b) => {
      calls.push([a, b])
    }

    groupCountsWith(fn, cntrs)
    assert.equal(calls.length, 3)
    
    assert.equal(Array.isArray(calls[0]), true)
    assert.equal(Array.isArray(calls[1]), true)
    assert.equal(Array.isArray(calls[2]), true)
    
    assert.equal(calls[0].length, 2)
    assert.equal(calls[0][0], cntrs[0][1][0])
    assert.equal(calls[0][1], cntrs[0][1][1])

    assert.equal(calls[1].length, 2)
    assert.equal(calls[1][0], cntrs[1][1][0])
    assert.equal(calls[1][1], cntrs[1][1][1])

    assert.equal(calls[2].length, 2)
    assert.equal(calls[2][0], cntrs[2][1][0])
    assert.equal(calls[2][1], cntrs[2][1][1])
  })
  it('alters the given counter array by replacing each counter\'s second value with the result of the given function', () => {
    const cntrs = [[number(2), [number(0), number(3)]], [number(3), [number(2), number(1)]], [number(5), [number(0), number(1)]]]
    const result = groupCountsWith(() => Either.Right(true), cntrs)

    assert.equal(result.length, 3)

    assert.equal(Array.isArray(result[0]), true)
    assert.equal(Array.isArray(result[1]), true)
    assert.equal(Array.isArray(result[2]), true)

    assert.equal(result[0][0], cntrs[0][0])
    assert.equal(result[1][0], cntrs[1][0])
    assert.equal(result[2][0], cntrs[2][0])

    assert.equal(result[0][1].value, true)
    assert.equal(result[1][1].value, true)
    assert.equal(result[2][1].value, true)
  })
})

describe('expandCounters', () => {
  it('returns the given array as is, when it contains one or more Lefts', () => {
    const cntrs = [[Either.Left(1), Either.Right(2)], [Either.Right(3), Either.Right(4)]]
    assert.equal(expandCounters(cntrs), cntrs)
  })
  it('takes an array of touples and repeats the first number the second\'s time', () => {
    const cntrs = [[number(2), number(3)], [number(3), number(0)], [number(5), number(1)]]
    const result = expandCounters(cntrs)

    assert.equal(result.length, 4)
    assert.equal(result[0].value.toString(), 2)
    assert.equal(result[1].value.toString(), 2)
    assert.equal(result[2].value.toString(), 2)
    assert.equal(result[3].value.toString(), 5)
  })
})

describe('setOperationWithRepeats', () => {
  it('returns the leftmost array containing Left, when any of the given arrays contain one or more Lefts', () => {
    const a = [number(1), number(2)]
    const b = [Either.Left(1), number(2)]
    const fn = () => {}
    
    assert.equal(setOperationWithRepeats(fn, a, b), b)
    assert.equal(setOperationWithRepeats(fn, b, a), b)
  })
  // TODO
})

describe('intersectionWithRepeats', () => {
  it('returns the leftmost array containing Left, when any of the given arrays contain one or more Lefts', () => {
    const a = [number(1), number(2)]
    const b = [Either.Left(1), number(2)]
    
    assert.equal(intersectionWithRepeats(a, b), b)
    assert.equal(intersectionWithRepeats(b, a), b)
  })
  it('takes two array of numbers as inputs and gives back the common elements from both', () => {
    const a = [number(1), number(2), number(2)]
    const b = [number(2), number(3), number(2)]

    const result = intersectionWithRepeats(a, b)
    assert.equal(result.length, 2)
    assert.equal(result[0].value.toString(), '2')
    assert.equal(result[1].value.toString(), '2')
  })
})

describe('topWithRepeats', () => {
  it('returns the leftmost array containing Left, when any of the given arrays contain one or more Lefts', () => {
    const a = [number(1), number(2)]
    const b = [Either.Left(1), number(2)]
    
    assert.equal(topWithRepeats(a, b), b)
    assert.equal(topWithRepeats(b, a), b)
  })
  it('takes two array of numbers as inputs and gives back each number\'s maximum occurence in either arrays', () => {
    const a = [number(1), number(2), number(2)]
    const b = [number(2), number(3), number(4)]

    const result = topWithRepeats(a, b)
    assert.equal(result.length, 5)
    assert.equal(result[0].value.toString(), '1')
    assert.equal(result[1].value.toString(), '2')
    assert.equal(result[2].value.toString(), '2')
    assert.equal(result[3].value.toString(), '3')
    assert.equal(result[4].value.toString(), '4')
  })
})
