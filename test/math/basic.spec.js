/* global describe, it */

import assert from 'assert'

import {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  pow,
  log,
  floor,
  isZero,
  gt
} from '../../src/math/basic'

describe('add', () => {
  it('adds together 2 numbers', () => {
    const value1 = add(6, 8)
    assert.equal(value1.toString(), '14')

    const value2 = add(Number.MAX_SAFE_INTEGER, 3)
    assert.equal(value2.toString(), '9007199254740994')

    const value3 = add(0.1, 0.2)
    assert.equal(value3.toString(), '0.3')
  })
  it('can be curried', () => {
    const a = add(3, 4)
    const b = add(3)(4)
    assert.equal(a.toString(), b.toString())
  })
})

describe('subtract', () => {
  it('subtracts the second number from the first', () => {
    const value1 = subtract(6, 8)
    assert.equal(value1.toString(), '-2')

    const value2 = subtract(Number.MIN_SAFE_INTEGER, 3)
    assert.equal(value2.toString(), '-9007199254740994')

    const value3 = subtract(0.3, 0.1)
    assert.equal(value3.toString(), '0.2')
  })
  it('can be curried', () => {
    const a = subtract(6, 4)
    const b = subtract(6)(4)
    assert.equal(a.toString(), b.toString())
  })
})

describe('multiply', () => {
  it('multiplies together 2 numbers', () => {
    const value1 = multiply(6, 8)
    assert.equal(value1.toString(), '48')

    const value2 = multiply(Number.MAX_SAFE_INTEGER, 2)
    assert.equal(value2.toString(), '18014398509481982')

    const value3 = multiply(0.6, 3)
    assert.equal(value3.toString(), '1.8')
  })
  it('can be curried', () => {
    const a = multiply(6, 4)
    const b = multiply(6)(4)
    assert.equal(a.toString(), b.toString())
  })
})

describe('divide', () => {
  it('divides the first number with the second', () => {
    const value1 = divide(12, 3)
    assert.equal(value1.toString(), '4')

    const value2 = divide('0.00000000001', '0.0000000001')
    assert.equal(value2.toString(), '0.1')

    const value3 = divide(0.6, 3)
    assert.equal(value3.toString(), '0.2')
  })
  it('can be curried', () => {
    const a = divide(12, 4)
    const b = divide(12)(4)
    assert.equal(a.toString(), b.toString())
  })
})

describe('modulo', () => {
  it('divides the first number with the second and gives back the remainder', () => {
    const value1 = modulo('12', '5')
    assert.equal(value1.toString(), '2')

    const value2 = modulo('1', '0.9')
    assert.equal(value2.toString(), '0.1')
  })
  it('can be curried', () => {
    const a = modulo('12')('5')
    const b = modulo('12', '5')
    assert.equal(a.toString(), b.toString())
  })
})

describe('pow', () => {
  it('raises the first argument to the second\'s power', () => {
    const value = pow(3, 4)
    assert.equal(value.toString(), '81')
  })
  it('can be curried', () => {
    const a = pow(3)(4)
    const b = pow(3, 4)
    assert.equal(a.toString(), b.toString())
  })
})

describe('log', () => {
  it('returns the first argument\'s nth base logarithm', () => {
    const value = log(256, 2)
    assert.equal(value.toString(), '8')
  })
  it('can be curried', () => {
    const a = log(3)(4)
    const b = log(3, 4)
    assert.equal(a.toString(), b.toString())
  })
})

describe('floor', () => {
  it('rounds down the given number', () => {
    const value = floor(12.999)
    assert.equal(value.toString(), '12')
  })
  it('leaves the number intact, if it\'s already a round number', () => {
    const value = floor(15)
    assert.equal(value.toString(), '15')
  })
})

describe('isZero', () => {
  it('returns true, when given number is zero', () => {
    const value = isZero(0)
    assert.equal(value, true)
  })
  it('returns false, when given number is not zero', () => {
    const value = isZero(63)
    assert.equal(value, false)
  })
})

describe('gt', () => {
  it('returns true, when first number is greater, than the second', () => {
    const value = gt(12, 4)
    assert.equal(value, true)
  })
})