/* global describe, it */

import assert from 'assert'
import {
  getType,
  getRandomBetween
} from './helpers'

import {
  isPrime,
  leastFactor
} from '../src/math'
import MonochordCore from '../src/index'

describe('MonochordCore', () => {
  it('has a baseVolume property', () => {
    assert.ok(MonochordCore.hasOwnProperty('baseVolume'))
  })

  it('has a baseFrequency property', () => {
    assert.ok(MonochordCore.hasOwnProperty('baseFrequency'))
  })
  describe('.baseFrequency', () => {
    it('is a readable/writable property', () => {
      const randomNumber = getRandomBetween(0, 1000)

      MonochordCore.baseFrequency = randomNumber
      assert.equal(MonochordCore.baseFrequency, randomNumber)
    })
  })

  describe('setBaseFrequency()', () => {
    it('is a method', () => {
      assert.equal(getType(MonochordCore.setBaseFrequency), 'function')
    })

    it('overrides baseFrequency when called with one parameter', () => {
      const newBaseFrequency = getRandomBetween(100, 1000)

      MonochordCore.baseFrequency = 0
      MonochordCore.setBaseFrequency(newBaseFrequency)
      assert.equal(MonochordCore.baseFrequency, newBaseFrequency)
    })

    // it('calculates baseFrequency from specified keynote', () => {
      // MonochordCore.setBaseFrequency(440, 'A4')
      // assert.equal(Math.floor(MonochordCore.baseFrequency), 262)
    // })
  })
})

describe('Math', () => {
  it('isPrime() returns true, if the given number is prime, false otherwise', () => {
    const primes = [2, 3, 13, 71, 263, 977, 1871]
    const notPrimes = [1, 13.8, 'F', true, 16, Math.PI, 9]

    assert.equal(primes.map(isPrime).find(result => result === false), null, JSON.stringify(primes) + ' should all return true')
    assert.equal(notPrimes.map(isPrime).find(result => result === true), null, JSON.stringify(notPrimes) + ' should all return false')
  })

  it('leastFactor() should return the smallest prime, which divides the passed number', () => {
    assert.equal(leastFactor(49), 7, 'the smallest prime factor of 49 is 7')
    assert.equal(leastFactor(50), 2, 'the smallest prime factor of 50 is 2')
    assert.equal(leastFactor(51), 3, 'the smallest prime factor of 51 is 3')
  })
})
