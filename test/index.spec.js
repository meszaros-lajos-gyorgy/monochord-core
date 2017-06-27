/* global describe, it */

import assert from 'assert'
import {
  getType,
  getRandomBetween
} from './helpers'

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
