/* global describe, it */

import assert from 'assert'

import {
  Either
} from 'ramda-fantasy'

import * as numbers from '../../src/math/numbers'

import {
  number
} from '../../src/math/helpers'

const T = () => Either.Right(true)
const F = () => Either.Right(false)

describe('isValid', () => {
  it('returns false, if any of the elements in the given array of Eithers is a Left', () => {
    const list = [Either.Right(1), Either.Left(2), Either.Right(3)]
    assert.equal(numbers.isValid(list), false)
  })
  it('returns true, if all elements in the given array of Eithers is a Right', () => {
    const list = [Either.Right(1), Either.Right(2), Either.Right(3)]
    assert.equal(numbers.isValid(list), true)
  })
})
describe('getValues', () => {
  it('returns the individual values from the Rights', () => {
    const list = numbers.getValues([number(1), number(2), number(3)])
    assert.equal(list[0].toString(), '1')
    assert.equal(list[1].toString(), '2')
    assert.equal(list[2].toString(), '3')
  })
})
describe('getLeft', () => {
  it('returns the first Left from the given array of Eithers', () => {
    const list = [Either.Right(1), Either.Left(2), Either.Right(3)]
    assert.equal(numbers.getLeft(list), list[1])
  })
  it('returns undefined, if there are no Lefts in the given array of Eithers', () => {
    const list = [Either.Right(1), Either.Right(2), Either.Right(3)]
    assert.equal(numbers.getLeft(list), undefined)
  })
})
describe('apply', () => {
  it('returns the first Left from the given array of Eithers', () => {
    const list = [Either.Right(1), Either.Left(2), Either.Right(3)]
    assert.equal(numbers.apply(T, list), list[1])
  })
  it('applies the values of the given array, when every element is a Right', () => {
    const list = [number(1), number(2), number(3)]
    let _args
    const fn = (...args) => {
      _args = args
    }
    numbers.apply(fn, list)

    assert.equal(_args.length, 3)
    assert.equal(_args[0].toString(), '1')
    assert.equal(_args[1].toString(), '2')
    assert.equal(_args[2].toString(), '3')
  })
  it('returns the result of the function, when every element is a Right', () => {
    const list = [number(1), number(2), number(3)]
    assert.equal(numbers.apply(T, list).value, true)
  })
  it('can be curried', () => {
    const list = [number(1), number(2), number(3)]
    assert.equal(numbers.apply(T, list).value, numbers.apply(T)(list).value)
  })
})

/*
describe('map', () => {
  // TODO
})
*/

describe('flatMap', () => {
  it('returns the given array intact, when any of the given elements is a Left', () => {
    const list = [Either.Right(1), Either.Left(2), Either.Right(3)]
    assert.deepEqual(numbers.flatMap(T, list), list)
  })
  it('applies fn to every value, when every element is a Right', () => {
    const list = [number(1), number(2), number(3)]
    const fn = num => Either.Right(num.add(5))
    const result = numbers.flatMap(fn, list)

    assert.equal(result.length, 3)
    assert.equal(result[0].value.toString(), '6')
    assert.equal(result[1].value.toString(), '7')
    assert.equal(result[2].value.toString(), '8')
  })
  it('can change the element type from Right to Left', () => {
    const list = [number(1), number(2), number(3)]
    const fn = num => Either.Left(num)
    const result = numbers.flatMap(fn, list)

    assert.equal(result.length, 3)
    assert.equal(result[0].isLeft, true)
    assert.equal(result[1].isLeft, true)
    assert.equal(result[2].isLeft, true)
  })
})

/*
describe('isValidDeep', () => {
  // TODO
})
*/

describe('uniq', () => {
  it('returns the given array intact, if it contains one or more Lefts', () => {
    const list = [number(1), number(1), Either.Left(1)]
    assert.equal(numbers.uniq(list), list)
  })
  it('removes duplicates of the given array', () => {
    const list = [number(1), number(1), number(2), number(1)]
    const result = numbers.uniq(list)

    assert.equal(result.length, 2)
    assert.equal(result[0].value.toString(), '1')
    assert.equal(result[1].value.toString(), '2')
  })
})

describe('union', () => {
  it('returns the common numbers without duplicates from the given two arrays', () => {
    const a = [number(1), number(2), number(3)]
    const b = [number(2), number(3), number(4)]

    const result = numbers.union(a, b)

    assert.equal(result.length, 4)
    assert.equal(result[0].value.toString(), '1')
    assert.equal(result[1].value.toString(), '2')
    assert.equal(result[2].value.toString(), '3')
    assert.equal(result[3].value.toString(), '4')
  })
  it('returns the leftmost array containing Left, when any of the given arrays contain one or more Lefts', () => {
    const a = [number(1), number(2)]
    const b = [Either.Left(1), number(2)]

    assert.equal(numbers.union(a, b), b)
    assert.equal(numbers.union(b, a), b)
  })
})
