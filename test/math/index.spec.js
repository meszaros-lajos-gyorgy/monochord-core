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
  sqrt,
  inc,
  dec,
  negate

  /*
  log,
  floor,
  pow,
  sqrt,
  logN,
  equals,
  lt,
  */
} from '../../src/math/index'

describe('inc', () => {
  it('increases a number with 1', () => {
    const value1 = inc(number('10'))
    assert.equal(value1.isRight, true)
    assert.equal(value1.value.toString(), '11')

    const value2 = inc(number(Number.MAX_SAFE_INTEGER))
    assert.equal(value2.isRight, true)
    assert.equal(value2.value.toString(), '9007199254740992')
  })
  it('returns a Left with invalid number error, when given parameter is an invalid number', () => {
    const value1 = inc('apple')
    assert.equal(value1.isLeft, true)
    assert.equal(value1.value, Errors.INVALID_NUMBER)

    const value2 = inc(number('apple'))
    assert.equal(value2.isLeft, true)
    assert.equal(value2.value, Errors.INVALID_NUMBER)
  })
})

/*
describe('add', () => {
  it('adds together 2 numbers', () => {
    assert.equal(add('3', '4'), '7')
    assert.equal(add('10000000000000001', '20000000000000002'), '30000000000000003')
    assert.equal(add('0.1', '0.2'), '0.3')
  })
  it('can be curried', () => {
    assert.equal(add('3')('4'), add('3', '4'))
  })
})

describe('subtract', () => {
  it('subtracts the second number from the first', () => {
    assert.equal(subtract('5', '2'), '3')
    assert.equal(subtract('0.3', '0.1'), '0.2')
    assert.equal(subtract('10000000000000002', '1'), '10000000000000001')
  })
  it('can be curried', () => {
    assert.equal(subtract('5')('2'), subtract('5', '2'))
  })
})

describe('multiply', () => {
  it('multiplies together 2 numbers', () => {
    assert.equal(multiply('3', '4'), '12')
    assert.equal(multiply('10000000000000001', '2'), '20000000000000002')
    assert.equal(multiply('0.6', '3'), '1.8')
  })
  it('can be curried', () => {
    assert.equal(multiply('3')('4'), multiply('3', '4'))
  })
})

describe('divide', () => {
  it('divides the first number with the second', () => {
    assert.equal(divide('12', '4'), '3')
    assert.equal(divide('0.00000000001', '0.0000000001'), '0.1')
  })
  it('can be curried', () => {
    assert.equal(divide('12')('4'), divide('12', '4'))
  })
})

describe('modulo', () => {
  it('divides the first number with the second and gives back the remainder', () => {
    assert.equal(modulo('12', '5'), '2')
    assert.equal(modulo('1', '0.9'), '0.1')
  })
  it('can be curried', () => {
    assert.equal(modulo('12')('5'), modulo('12', '5'))
  })
})

describe('log', () => {

})

describe('floor', () => {

})

describe('pow', () => {
  it('raises the first argument to the second argument\'s power', () => {
    assert.equal(pow(3, 4), 81)
  })
  it('can be curried', () => {
    assert.equal(pow(3)(4), pow(3, 4))
  })
})

describe('sqrt', () => {

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

describe('dec', () => {
  it('lowers the given number by 1', () => {
    assert.equal(dec('12'), '11')
  })
})

describe('negate', () => {

})
*/
