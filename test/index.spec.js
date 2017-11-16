/* global describe, it */

import assert from 'assert'

import {
  isHumanReadableAscii,
  isComment,
  isRatio,
  isCent,
  splitToLines
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

describe('isRatio', () => {
  it('returns true, when given string contains one positive integer, or two separated by a slash', () => {
    assert.equal(isRatio('81/64'), true)
    assert.equal(isRatio('5'), true)
  })
  it('ignores leading spages and tabs', () => {
    assert.equal(isRatio(' 10/20'), true)
    assert.equal(isRatio('\t10/20'), true)
    assert.equal(isRatio('\t  \t10'), true)
  })
  it('ignores stuff written after the ratio, when there is a space or tab after it', () => {
    assert.equal(isRatio('5/4 E\\'), true)
    assert.equal(isRatio('5/4\tE\\'), true)
    assert.equal(isRatio('5   E\\'), true)
  })

  it('returns false for negative integers or ratios', () => {
    assert.equal(isRatio('-4'), false)
    assert.equal(isRatio('-4/3'), false)
    assert.equal(isRatio('4/-3'), false)
    assert.equal(isRatio('-4/-3'), false)
  })
  it('returns false, when given string does not start with a number', () => {
    assert.equal(isRatio('! hello'), false)
    assert.equal(isRatio('  _12'), false)
    assert.equal(isRatio('\t*12'), false)
  })
  it('returns false, when given ratio contains more, than 1 slashes', () => {
    assert.equal(isRatio('12//4'), false)
    assert.equal(isRatio('12/3/4'), false)
  })
  it('returns false, when given number is in a scientific notation', () => {
    assert.equal(isRatio('125e5'), false)
  })
  it('returns false, when given string contains one or more float values', () => {
    assert.equal(isRatio('3/2.4'), false)
    assert.equal(isRatio('3.2'), false)
    assert.equal(isRatio('6.5/3'), false)
    assert.equal(isRatio('6.5/3.8'), false)
  })
})

describe('isCent', () => {
  it('returns true, when given string contains a float written in decimal notation', () => {
    assert.equal(isCent('408.0'), true)
  })
  it('returns true for negative values too', () => {
    assert.equal(isCent('-5.0'), true)
  })
  it('returns true, when the decimal part is skipped, but the point is kept', () => {
    assert.equal(isCent('408.'), true)
  })
  it('ignores leading spages and tabs', () => {
    assert.equal(isCent(' 100.0'), true)
    assert.equal(isCent('\t100.0'), true)
    assert.equal(isCent('\t  \t100.0'), true)
  })
  it('ignores stuff written after the cent, when there is a space or tab after it', () => {
    assert.equal(isCent('100.0 cents'), true)
    assert.equal(isCent('100.0\tC#'), true)
    assert.equal(isCent('100.0    C#'), true)
  })

  it('returns false, when given number is in a scientific notation', () => {
    assert.equal(isCent('125e5'), false)
  })
  it('returns false, when given string contains a ratio', () => {
    assert.equal(isCent('3/2'), false)
  })
  it('returns false, when given string does not start with a number', () => {
    assert.equal(isCent('! hello'), false)
    assert.equal(isCent('  _12'), false)
    assert.equal(isCent('\t*12'), false)
  })
  it('returns false, when given number doesn\'t have any dots in it', () => {
    assert.equal(isCent('26'), false)
  })
  it('returns false, when given number has more, than 1 dot in it', () => {
    assert.equal(isCent('26.2.4'), false)
    assert.equal(isCent('26..4'), false)
  })
})

describe('splitToLines', () => {
  it('splits a string upon newline characters', () => {
    assert.deepEqual(splitToLines('a\nb\nc'), ['a', 'b', 'c'])
  })
  it('accepts both windows and unix type newlines', () => {
    assert.deepEqual(splitToLines('a\nb'), ['a', 'b'])
    assert.deepEqual(splitToLines('a\r\nb'), ['a', 'b'])
  })
})
