/* global describe, it */

import assert from 'assert'
import {
  getType,
  getRandomBetween
} from './helpers'

import {
  isPrime,
  leastFactor,
  getPrimeFactors
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
  describe('isPrime()', () => {
    it('returns true, if the given number is prime, false otherwise', () => {
      const primes = [2, 3, 13, 71, 263, 977, 1871]
      const notPrimes = [1, 13.8, 'F', true, 16, Math.PI, 9]

      assert.equal(primes.map(isPrime).find(result => result === false), null, JSON.stringify(primes) + ' should all return true')
      assert.equal(notPrimes.map(isPrime).find(result => result === true), null, JSON.stringify(notPrimes) + ' should all return false')
    })
  })
  
  describe('leastFactor()', () => {
    it('should return the smallest prime, which divides the passed number', () => {
      assert.equal(leastFactor(49), 7, 'the smallest prime factor of 49 is 7')
      assert.equal(leastFactor(50), 2, 'the smallest prime factor of 50 is 2')
      assert.equal(leastFactor(51), 3, 'the smallest prime factor of 51 is 3')
    })
    it('should return NaN, when given number is not a valid number', () => {
      assert.strictEqual(isNaN(leastFactor(Math.PI)), true, 'Math.PI is not a valid number for getting it\'s least prime factor')
      assert.strictEqual(isNaN(leastFactor('String')), true, '"String" is not a valid number for getting it\'s least prime factor')
      assert.strictEqual(isNaN(leastFactor(true)), true, 'true is not a valid number for getting it\'s least prime factor')
    })
  })
  
  describe('getPrimeFactors()', () => {
    it('should split a given number into an array of it\'s prime factors', () => {
      assert.deepEqual(getPrimeFactors(70), [2, 5, 7], '70\'s prime factors are 2, 5 and 7')
      assert.deepEqual(getPrimeFactors(27), [3, 3, 3], '27\'s prime factors are 3, 3 and 3')
    })
    
    it('should set the first number in the result array to negative, when given number is negative', () => {
      assert.deepEqual(getPrimeFactors(-4), [-2, 2], '-4\'s prime factors are -2 and 2')
      assert.deepEqual(getPrimeFactors(-192), [-2, 2, 2, 2, 2, 2, 3], '-4\'s prime factors are -2, 2, 2, 2, 2, 2 and 3')
    })
    
    it('should return an empty array, when given number is not a valid number', () => {
      assert.deepEqual(getPrimeFactors(Math.PI), [], 'Math.PI is not a valid number for prime factorization')
      assert.deepEqual(getPrimeFactors('String'), [], '"String" is not a valid number for prime factorization')
      assert.deepEqual(getPrimeFactors(true), [], 'true is not a valid number for prime factorization')
    })
  })
})
