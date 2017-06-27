/* global describe, it */

import assert from 'assert'
import {
  int,
  prime,
  testWithType as twt
} from 'reverse-assert'

const testWithType = twt(it)

import {
  isInteger,
  isPrime,
  leastFactor,
  getPrimeFactors
} from '../src/math'

describe('Math', () => {
  describe('isInteger()', () => {
    testWithType(isInteger, int.valid, true)
    testWithType(isInteger, int.invalid, false)
  })
  describe('isPrime()', () => {
    testWithType(isPrime, prime.valid, true)
    testWithType(isPrime, prime.invalid, false)
  })
  
  describe('leastFactor()', () => {
    it('should return the smallest prime, which divides the passed number', () => {
      assert.equal(leastFactor(49), 7, 'the smallest prime factor of 49 is 7')
      assert.equal(leastFactor(50), 2, 'the smallest prime factor of 50 is 2')
      assert.equal(leastFactor(51), 3, 'the smallest prime factor of 51 is 3')
    })
    testWithType(leastFactor, int.invalid, NaN)
  })
  
  describe('getPrimeFactors()', () => {
    it('should split a given number into an array of it\'s prime factors', () => {
      assert.deepEqual(getPrimeFactors(70), [2, 5, 7], `70's prime factors are 2, 5 and 7`)
      assert.deepEqual(getPrimeFactors(27), [3, 3, 3], `27's prime factors are 3, 3 and 3`)
    })
    
    testWithType(getPrimeFactors, int.invalid, [], true)
  })
})
