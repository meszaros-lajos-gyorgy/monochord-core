/* global describe, it */

import assert from 'assert'

import {
  always,
  apply
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
  numbers,
  wrapArity,
  wrapUnary,
  wrapBinary,
  invert,
  ifThenElse
} from '../../src/math/helpers'

const T = () => Either.Right(true)
const F = () => Either.Right(false)

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
    const fn = memoizeCalculation(T)
    assert.equal(typeof fn, 'function')
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
    assert.equal(fn().value, fn2().value)
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

describe('numbers', () => {
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
})

/*
describe('wrapArity', () => {
  // TODO
})
*/

describe('wrapUnary', () => {
  it('takes a funcion as input and gives back a function', () => {
    const fn = wrapUnary(T)
    assert.equal(typeof fn, 'function')
  })
  it('using the recieved function, it leaves the input intact, if it is a Left or returns a Left, if the input is an invalid number', () => {
    const fn = wrapUnary(T)

    const val1 = Either.Left('hello')
    assert.equal(fn(val1), val1)

    const val2 = fn(undefined)
    assert.equal(val2.isLeft, true)
    assert.equal(val2.value, Errors.INVALID_NUMBER)
  })
  it('applies the original function to the given parameter, if it is a valid number', () => {
    const fn = wrapUnary(a => {
      return Either.Right(a.add(1))
    })
    
    const val = fn(12)
    assert.equal(val.isRight, true)
    assert.equal(val.value.toString(), '13')
  })
  it('requires a function, which returns an Either', () => {
    const fn = wrapUnary(a => {
      return null
    })
    assert.throws(() => {
      fn(12)
    })
  })
  it('ignores any other given parameters apart from the 1st', () => {
    let _args
    const fn = wrapUnary((...args) => {
      _args = args
      return Either.Right(true)
    })
    fn(1, 2, 3, 4, 5)
    assert.equal(_args.length, 1)
    assert.equal(_args[0].toString(), '1')
  })
  it('gives back an Either based on the result of the passed function', () => {
    const fn1 = wrapUnary(T)
    const fn2 = wrapUnary(() => Either.Left('eee'))

    assert.equal(fn1(10).isRight, true)
    assert.equal(fn2(10).isLeft, true)
  })
  it('memoizes the calculations', () => {
    let calls = 0
    const fn = wrapUnary(a => {
      calls++
      return Either.Right(a.add(1))
    })
    
    fn(12)
    fn(12)
    fn(12)
    fn(12)
    assert.equal(calls, 1)
    fn(7)
    fn(7)
    fn(7)
    fn(7)
    assert.equal(calls, 2)
  })
})

describe('wrapBinary', () => {
  it('takes a funcion as input and gives back a function', () => {
    const fn = wrapBinary(T)
    assert.equal(typeof fn, 'function')
  })
  it('using the recieved function, it returns the leftmost invalid number/Left value, even if one value would be okay', () => {
    const fn = wrapBinary(T)

    const val1_1 = Either.Left('hello')
    const val1_2 = Either.Left('ooo')
    assert.equal(fn(val1_1, val1_2), val1_1)

    const val2_1 = 12
    const val2_2 = undefined
    assert.equal(fn(val2_1, val2_2).isLeft, true)
    assert.equal(fn(val2_1, val2_2).value, Errors.INVALID_NUMBER)
  })
  it('has curry on the returned function', () => {
    const fn = wrapBinary((a, b) => {
      return Either.Right(a.add(b))
    })

    assert.equal(fn(12, 5).value.toString(), fn(12)(5).value.toString())
  })
  it('applies the original function to the given 2 parameters, if it is a valid number', () => {
    const fn = wrapBinary((a, b) => {
      return Either.Right(a.add(b))
    })
    
    const val = fn(12, 5)
    assert.equal(val.isRight, true)
    assert.equal(val.value.toString(), '17')
  })
  it('requires a function, which returns an Either', () => {
    const fn = wrapBinary(a => {
      return null
    })
    assert.throws(() => {
      fn(12, 15)
    })
  })
  it('ignores any other given parameters apart from the first 2', () => {
    let _args
    const fn = wrapBinary((...args) => {
      _args = args
      return Either.Right(true)
    })
    fn(1, 2, 3, 4, 5)
    assert.equal(_args.length, 2)
    assert.equal(_args[0].toString(), '1')
    assert.equal(_args[1].toString(), '2')
  })
  it('gives back an Either based on the result of the passed function', () => {
    const fn1 = wrapBinary(T)
    const fn2 = wrapBinary(() => Either.Left('eee'))

    assert.equal(fn1(10, 20).isRight, true)
    assert.equal(fn2(10, 20).isLeft, true)
  })
  it('memoizes the calculations', () => {
    let calls = 0
    const fn = wrapBinary((a, b) => {
      calls++
      return Either.Right(a.add(b))
    })
    
    fn(12, 6)
    fn(12, 6)
    fn(12, 6)
    fn(12, 6)
    assert.equal(calls, 1)
    fn(8, 5)
    fn(8, 5)
    fn(8, 5)
    fn(8, 5)
    assert.equal(calls, 2)
  })
})

describe('invert', () => {
  it('takes a function as input and gives back a function', () => {
    const fn = invert(T)
    assert.equal(typeof fn, 'function')
  })
  it('gives back a function, which wraps the original function in a way, that when it\'s called, it will return the inverse of the returned value', () => {
    const fn = invert(T)
    assert.equal(fn().value, false)
  })
  it('returns back a function\'s result untouched, if it\'s a Left', () => {
    const fn = () => Either.Left(true)
    const fn2 = invert(fn)
    assert.equal(fn().value, true)
    assert.equal(fn2().value, true)
  })
})

describe('ifThenElse', () => {
  const truthy = always(number(4))
  const falsy = always(number(20))

  it('takes 3 functions as inputs and returns a function, which executes the 1st function and calles the 2nd on a truthy value and the 3rd otherwise', () => {
    assert.equal(ifThenElse(T, truthy, falsy)(1, 2).value.toString(), truthy().value.toString())
    assert.equal(ifThenElse(F, truthy, falsy)(1, 2).value.toString(), falsy().value.toString())
  })
  it('expects the 1st function to return a truthy or falsy value', () => {
    assert.equal(ifThenElse(always(Either.Right({})), truthy, falsy)(1, 2).value.toString(), truthy().value.toString())
    assert.equal(ifThenElse(always(Either.Right('1234')), truthy, falsy)(1, 2).value.toString(), truthy().value.toString())
    assert.equal(ifThenElse(always(Either.Right([1, 2, 3, 4])), truthy, falsy)(1, 2).value.toString(), truthy().value.toString())

    assert.equal(ifThenElse(always(Either.Right(null)), truthy, falsy)(1, 2).value.toString(), falsy().value.toString())
    assert.equal(ifThenElse(always(Either.Right('')), truthy, falsy)(1, 2).value.toString(), falsy().value.toString())
    assert.equal(ifThenElse(always(Either.Right(NaN)), truthy, falsy)(1, 2).value.toString(), falsy().value.toString())
  })
  it('if the 1st function returns a Left, then that value is returned, no further processing is done', () => {
    const val = Either.Left('hello')
    assert.equal(ifThenElse(() => val, truthy, falsy)(1, 2), val)
  })
  it('allows currying for the main function', () => {
    const fn1 = ifThenElse(T)(truthy, falsy)
    const fn2 = ifThenElse(T, truthy)(falsy)
    const fn3 = ifThenElse(T, truthy, falsy)
    const fn4 = ifThenElse(T)(truthy)(falsy)
    const params = [1, 2]
    assert.equal(apply(fn1, params).value.toString(), apply(fn2, params).value.toString())
    assert.equal(apply(fn1, params).value.toString(), apply(fn3, params).value.toString())
    assert.equal(apply(fn1, params).value.toString(), apply(fn4, params).value.toString())
  })
  // memoize
  // does not change the orignal values
})
