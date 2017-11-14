/* global describe, it */

import assert from 'assert'

import {
  isHumanReadableAscii,
  isComment
} from '../src/index'

describe('isHumanReadableAscii', () => {
  it('returns true, if the given string contains letters', () => {
    assert.equal(isHumanReadableAscii('abcdefghijklmnopqrstuvwxyz'), true)
    assert.equal(isHumanReadableAscii('ABCDEFGHIJKLMNOPQRSTUVWXYZ'), true)
  })
  it('returns true, if the given string contains numbers', () => {
    assert.equal(isHumanReadableAscii('0123456789'), true)
  })
  it('returns true, if the given string contains common special characters', () => {
    assert.equal(isHumanReadableAscii('.: ,;!?-_\'"+-=%*/\\()[]<>@&#'), true)
  })
  it('returns false, when given string contains control characters', () => {
    // https://en.wikipedia.org/wiki/Control_character#In_ASCII
    assert.equal(isHumanReadableAscii(String.fromCharCode(
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
      30, 31, 127
    )), false)
  })
  it('returns false, when given string contains characters from extended ascii table', () => {
    assert.equal(isHumanReadableAscii(String.fromCharCode(
      128, 129, 130
    )), false)
  })
})

describe('isComment', () => {
  it('returns true, if the given string starts with an exclamation mark', () => {
    assert.equal(isComment('! This supposed to be a comment'), true)
  })
  it('returns false, when the given string does not start with an exclamation mark', () => {
    assert.equal(isComment('    ! This has some whitespaces at the beginning'), false)
    assert.equal(isComment('12.45'), false)
  })
})