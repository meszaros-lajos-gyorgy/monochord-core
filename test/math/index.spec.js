/* global describe, it */

import assert from 'assert'

import {
  Errors
} from '../../src/math/constants'

import {
  number,

  add,
  subtract,
  multiply,
  divide,
  modulo,
  floor,
  ceil,
  inc,
  dec,
  negate,

  pow,
  root,
  sqrt,

  /*
  log,
  logN,

  equals,
  lt,
  gt,
  lte,
  gte,

  isZero,
  isNegative,
  isPositive,
  */

  isInteger,
  isFraction
} from '../../src/math/index'

describe('add', () => {
  it('adds together 2 numbers', () => {
    const value1 = add(6, 8)
    assert.equal(value1.isRight, true)
    assert.equal(value1.value.toString(), '14')

    const value2 = add(Number.MAX_SAFE_INTEGER, 3)
    assert.equal(value2.isRight, true)
    assert.equal(value2.value.toString(), '9007199254740994')

    const value3 = add(0.1, 0.2)
    assert.equal(value3.isRight, true)
    assert.equal(value3.value.toString(), '0.3')
  })
  it('returns a Left with invalid number error, when any of the given parameters is an invalid number', () => {
    const value1 = add('apple', 12)
    assert.equal(value1.isLeft, true)
    assert.equal(value1.value, Errors.INVALID_NUMBER)

    const value2 = add(12, false)
    assert.equal(value2.isLeft, true)
    assert.equal(value2.value, Errors.INVALID_NUMBER)
  })
  it('can be curried', () => {
    const a = add(3, 4)
    const b = add(3)(4)
    assert.equal(a.value.toString(), b.value.toString())
  })
})

describe('subtract', () => {
  it('subtracts the second number from the first', () => {
    const value1 = subtract(6, 8)
    assert.equal(value1.isRight, true)
    assert.equal(value1.value.toString(), '-2')

    const value2 = subtract(Number.MIN_SAFE_INTEGER, 3)
    assert.equal(value2.isRight, true)
    assert.equal(value2.value.toString(), '-9007199254740994')

    const value3 = subtract(0.3, 0.1)
    assert.equal(value3.isRight, true)
    assert.equal(value3.value.toString(), '0.2')
  })
  it('returns a Left with invalid number error, when any of the given parameters is an invalid number', () => {
    const value1 = subtract('apple', 12)
    assert.equal(value1.isLeft, true)
    assert.equal(value1.value, Errors.INVALID_NUMBER)

    const value2 = subtract(12, false)
    assert.equal(value2.isLeft, true)
    assert.equal(value2.value, Errors.INVALID_NUMBER)
  })
  it('can be curried', () => {
    const a = subtract(6, 4)
    const b = subtract(6)(4)
    assert.equal(a.value.toString(), b.value.toString())
  })
})

describe('multiply', () => {
  it('multiplies together 2 numbers', () => {
    const value1 = multiply(6, 8)
    assert.equal(value1.isRight, true)
    assert.equal(value1.value.toString(), '48')

    const value2 = multiply(Number.MAX_SAFE_INTEGER, 2)
    assert.equal(value2.isRight, true)
    assert.equal(value2.value.toString(), '18014398509481982')

    const value3 = multiply(0.6, 3)
    assert.equal(value3.isRight, true)
    assert.equal(value3.value.toString(), '1.8')
  })
  it('returns a Left with invalid number error, when any of the given parameters is an invalid number', () => {
    const value1 = multiply('apple', 12)
    assert.equal(value1.isLeft, true)
    assert.equal(value1.value, Errors.INVALID_NUMBER)

    const value2 = multiply(12, false)
    assert.equal(value2.isLeft, true)
    assert.equal(value2.value, Errors.INVALID_NUMBER)
  })
  it('can be curried', () => {
    const a = multiply(6, 4)
    const b = multiply(6)(4)
    assert.equal(a.value.toString(), b.value.toString())
  })
})

describe('divide', () => {
  it('divides the first number with the second', () => {
    const value1 = divide(12, 3)
    assert.equal(value1.isRight, true)
    assert.equal(value1.value.toString(), '4')

    const value2 = divide('0.00000000001', '0.0000000001')
    assert.equal(value2.isRight, true)
    assert.equal(value2.value.toString(), '0.1')

    const value3 = divide(0.6, 3)
    assert.equal(value3.isRight, true)
    assert.equal(value3.value.toString(), '0.2')
  })
  it('returns a Left with invalid number error, when any of the given parameters is an invalid number', () => {
    const value1 = divide('apple', 12)
    assert.equal(value1.isLeft, true)
    assert.equal(value1.value, Errors.INVALID_NUMBER)

    const value2 = divide(12, false)
    assert.equal(value2.isLeft, true)
    assert.equal(value2.value, Errors.INVALID_NUMBER)
  })
  it('returns a Right with Infinity, when divisor is zero', () => {
    const value = divide(12, 0)
    assert.equal(value.isRight, true)
    assert.equal(value.value.toString(), 'Infinity')
  })
  it('can be curried', () => {
    const a = divide(12, 4)
    const b = divide(12)(4)
    assert.equal(a.value.toString(), b.value.toString())
  })
})

describe('modulo', () => {
  it('divides the first number with the second and gives back the remainder', () => {
    const value1 = modulo('12', '5')
    assert.equal(value1.isRight, true)
    assert.equal(value1.value.toString(), '2')

    const value2 = modulo('1', '0.9')
    assert.equal(value2.isRight, true)
    assert.equal(value2.value.toString(), '0.1')
  })
  it('returns a Left with invalid number error, when any of the given parameters is an invalid number', () => {
    const value1 = modulo('apple', 12)
    assert.equal(value1.isLeft, true)
    assert.equal(value1.value, Errors.INVALID_NUMBER)

    const value2 = modulo(12, false)
    assert.equal(value2.isLeft, true)
    assert.equal(value2.value, Errors.INVALID_NUMBER)
  })
  it('can be curried', () => {
    const a = modulo('12')('5')
    const b = modulo('12', '5')
    assert.equal(a.value.toString(), b.value.toString())
  })
})

describe('floor', () => {
  it('rounds down the given number', () => {
    const value = floor(12.999)
    assert.equal(value.isRight, true)
    assert.equal(value.value.toString(), '12')
  })
  it('leaves the number intact, if it\'s already a round number', () => {
    const value = floor(15)
    assert.equal(value.isRight, true)
    assert.equal(value.value.toString(), '15')
  })
  it('returns a Left with invalid number error, when given parameter is an invalid number', () => {
    const value = floor('apple')
    assert.equal(value.isLeft, true)
    assert.equal(value.value, Errors.INVALID_NUMBER)
  })
})
describe('ceil', () => {
  it('rounds down the given number', () => {
    const value = ceil(12.0000001)
    assert.equal(value.isRight, true)
    assert.equal(value.value.toString(), '13')
  })
  it('leaves the number intact, if it\'s already a round number', () => {
    const value = ceil(15)
    assert.equal(value.isRight, true)
    assert.equal(value.value.toString(), '15')
  })
  it('returns a Left with invalid number error, when given parameter is an invalid number', () => {
    const value = ceil('apple')
    assert.equal(value.isLeft, true)
    assert.equal(value.value, Errors.INVALID_NUMBER)
  })
})

describe('inc', () => {
  it('increases a number with 1', () => {
    const value1 = inc('10')
    assert.equal(value1.isRight, true)
    assert.equal(value1.value.toString(), '11')

    const value2 = inc(Number.MAX_SAFE_INTEGER)
    assert.equal(value2.isRight, true)
    assert.equal(value2.value.toString(), '9007199254740992')
  })
  it('returns a Left with invalid number error, when given parameter is an invalid number', () => {
    const value = inc('apple')
    assert.equal(value.isLeft, true)
    assert.equal(value.value, Errors.INVALID_NUMBER)
  })
})

describe('dec', () => {
  it('decreases a number by 1', () => {
    const value1 = dec(number('10'))
    assert.equal(value1.isRight, true)
    assert.equal(value1.value.toString(), '9')

    const value2 = dec(number(Number.MAX_SAFE_INTEGER))
    assert.equal(value2.isRight, true)
    assert.equal(value2.value.toString(), '9007199254740990')
  })
  it('returns a Left with invalid number error, when given parameter is an invalid number', () => {
    const value = dec('apple')
    assert.equal(value.isLeft, true)
    assert.equal(value.value, Errors.INVALID_NUMBER)
  })
})

describe('negate', () => {
  it('changes the sign of a number from positive to negative and vice versa', () => {
    const value1 = negate(6)
    assert.equal(value1.isRight, true)
    assert.equal(value1.value.toString(), '-6')

    const value2 = negate(Number.MAX_SAFE_INTEGER)
    assert.equal(value2.isRight, true)
    assert.equal(value2.value.toString(), '-9007199254740991')

    const value3 = negate(-0.6)
    assert.equal(value3.isRight, true)
    assert.equal(value3.value.toString(), '0.6')
  })
  it('returns a Left with invalid number error, when given parameter is an invalid number', () => {
    const value = negate('apple')
    assert.equal(value.isLeft, true)
    assert.equal(value.value, Errors.INVALID_NUMBER)
  })
})

describe('pow', () => {
  it('raises the first argument to the second\'s power', () => {
    const value = pow(3, 4)
    assert.equal(value.isRight, true)
    assert.equal(value.value.toString(), '81')
  })
  it('returns a Left with invalid number error, when any of the given parameters is an invalid number', () => {
    const value1 = pow('apple', 12)
    assert.equal(value1.isLeft, true)
    assert.equal(value1.value, Errors.INVALID_NUMBER)

    const value2 = pow(12, false)
    assert.equal(value2.isLeft, true)
    assert.equal(value2.value, Errors.INVALID_NUMBER)
  })
  it('can be curried', () => {
    const a = pow(3)(4)
    const b = pow(3, 4)
    assert.equal(a.value.toString(), b.value.toString())
  })
})

describe('root', () => {
  it('takes the first argument\'s nth root', () => {
    const value = root(81, 4)
    assert.equal(value.isRight, true)
    assert.equal(value.value.toString(), '3')
  })
  it('returns a Left with invalid number error, when any of the given parameters is an invalid number', () => {
    const value1 = root('apple', 12)
    assert.equal(value1.isLeft, true)
    assert.equal(value1.value, Errors.INVALID_NUMBER)

    const value2 = root(12, false)
    assert.equal(value2.isLeft, true)
    assert.equal(value2.value, Errors.INVALID_NUMBER)
  })
  it('can be curried', () => {
    const a = root(3)(4)
    const b = root(3, 4)
    assert.equal(a.value.toString(), b.value.toString())
  })
})

describe('sqrt', () => {
  it('takes the square root of a number', () => {
    const value = sqrt(81)
    assert.equal(value.isRight, true)
    assert.equal(value.value.toString(), '9')
  })
  it('returns a Left with invalid number error, when any of the given parameters is an invalid number', () => {
    const value = sqrt('apple')
    assert.equal(value.isLeft, true)
    assert.equal(value.value, Errors.INVALID_NUMBER)
  })
})

/*
describe('log', () => {

})

describe('logN', () => {

})

describe('equals', () => {
  it('compares two values and returns true, when they are the same', () => {
    assert.equal(equals('12', '12'), true)
  })
  it('returns false, when given two number is not the same', () => {
    assert.equal(equals('12', '34'), false)
  })
  it('can be curried', () => {
    assert.equal(equals('12')('12'), equals('12', '12'))
  })
})

describe('lt', () => {

})
*/

describe('isInteger', () => {
  it('returns true, when given number is an integer', () => {
    const value = isInteger(12)
    assert.equal(value.isRight, true)
    assert.equal(value.value, true)
  })
  it('returns false, when given number is not an integer', () => {
    const value = isInteger(12.5543)
    assert.equal(value.isRight, true)
    assert.equal(value.value, false)
  })
  it('returns a Left with invalid number error, when given parameter is an invalid number', () => {
    const value = isInteger('apple')
    assert.equal(value.isLeft, true)
    assert.equal(value.value, Errors.INVALID_NUMBER)
  })
})

describe('isFraction', () => {
  it('returns false, when given number is an integer', () => {
    const value = isFraction(12)
    assert.equal(value.isRight, true)
    assert.equal(value.value, false)
  })
  it('returns true, when given number is not an integer', () => {
    const value = isFraction(12.5543)
    assert.equal(value.isRight, true)
    assert.equal(value.value, true)
  })
  it('returns a Left with invalid number error, when given parameter is an invalid number', () => {
    const value = isFraction('apple')
    assert.equal(value.isLeft, true)
    assert.equal(value.value, Errors.INVALID_NUMBER)
  })
})
