/* global describe, it */

import assert from 'assert'

import {
  add,
  subtract,
  multiply,
  divide,
  log,
  floor,
  pow,
  logX,
  equals,
  inc,
  dec
} from '../../src/math/index'

describe('add', () => {
  it('adds together 2 numbers', () => {
    assert.equal(add(3, 4), 7)
  })
  it('can be curried', () => {
    assert.equal(add(3)(4), add(3, 4))
  })
})

describe('subtract', () => {
  it('subtracts the second number from the first', () => {
    assert.equal(subtract(5, 2), 3)
  })
  it('can be curried', () => {
    assert.equal(subtract(5)(2), subtract(5, 2))
  })
})

describe('multiply', () => {
  it('multiplies together 2 numbers', () => {
    assert.equal(multiply(3, 4), 12)
  })
  it('can be curried', () => {
    assert.equal(multiply(3)(4), multiply(3, 4))
  })
})

describe('divide', () => {
  it('divides the first number with the second', () => {
    assert.equal(divide(12, 4), 3)
  })
  it('can be curried', () => {
    assert.equal(divide(12)(4), divide(12, 4))
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

describe('logX', () => {

})

describe('equals', () => {
  it('compares two values and returns true, when they are the same', () => {
    assert.equal(equals(12, 12), true)
  })
  it('returns false, when given two number is not the same', () => {
    assert.equal(equals(12, 34), false)
  })
})

describe('inc', () => {
  it('raises the given number by 1', () => {
    assert.equal(inc(12), 13)
  })
})

describe('dec', () => {
  it('lowers the given number by 1', () => {
    assert.equal(dec(12), 11)
  })
})
