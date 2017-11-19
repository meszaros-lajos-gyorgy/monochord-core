/* global describe, it */

import assert from 'assert'

import {
  isHumanReadableAscii,
  splitToLines,
  isComment,
  removeComments,
  isCent,
  isRatio,
  isValidPitch,
  ignoreAllAfterPitch,
  ignoreLeadingWhitespace,
  getValue,
  isFoundation,
  hasAtLeastNElements,
  isValidScale
} from '../../src/scala/index'

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
  it('returns true, if the given string contains tabs', () => {
    // TODO: is this a correct behavior?
    assert.equal(isHumanReadableAscii('12\tF#'), true)
  })
  it('returns false, when given string contains control characters', () => {
    // https://en.wikipedia.org/wiki/Control_character#In_ASCII
    assert.equal(isHumanReadableAscii(String.fromCharCode(
      0, 1, 2, 3, 4, 5, 6, 7, 8,
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

describe('splitToLines', () => {
  it('splits a string upon newline characters', () => {
    assert.deepEqual(splitToLines('a\nb\nc'), ['a', 'b', 'c'])
  })
  it('accepts both windows and unix type newlines', () => {
    assert.deepEqual(splitToLines('a\nb'), ['a', 'b'])
    assert.deepEqual(splitToLines('a\r\nb'), ['a', 'b'])
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

describe('removeComments', () => {
  it('removes comments from an array of strings', () => {
    assert.deepEqual(removeComments(['! comment', '2', '! another comment']), ['2'])
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
  it('returns false, when there is some content after the cent, but it\'s not separated with a space or tab', () => {
    assert.equal(isCent('30.3! comment'), false)
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
  it('returns false, when there is some content after the ratio, but it\'s not separated with a space or tab', () => {
    assert.equal(isRatio('21/18! comment'), false)
  })
})

describe('isValidPitch', () => {
  it('returns true, when given value is a cent', () => {
    const cent = '3.2'
    assert.equal(isCent(cent), true)
    assert.equal(isValidPitch(cent), true)
  })
  it('returns true, when given value is a ratio', () => {
    const ratio = '6/5'
    assert.equal(isRatio(ratio), true)
    assert.equal(isValidPitch(ratio), true)
  })
  it('returns false, when given value is not a cent or a ratio', () => {
    const value = '! comment'
    assert.equal(isCent(value), false)
    assert.equal(isRatio(value), false)
    assert.equal(isValidPitch(value), false)
  })
})

describe('ignoreAllAfterPitch', () => {
  it('removes everything after the first space or tab, which is not at the beginning of the string', () => {
    assert.equal(ignoreAllAfterPitch('17/4 E#'), '17/4')
    assert.equal(ignoreAllAfterPitch('30.256\t12'), '30.256')
    assert.equal(ignoreAllAfterPitch('-5. ! hello'), '-5.')
  })
})

describe('ignoreLeadingWhitespace', () => {
  it('strips off leading spaces and tabs', () => {
    assert.equal(ignoreLeadingWhitespace('  100.3'), '100.3')
    assert.equal(ignoreLeadingWhitespace('\t100.3'), '100.3')
  })
})

describe('getValue', () => {
  it('strips off leading spaces and tabs', () => {
    assert.equal(getValue('  100.3'), '100.3')
    assert.equal(getValue('\t100.3'), '100.3')
  })
  it('removes everything after the first space or tab, which is not at the beginning of the string', () => {
    assert.equal(getValue('17/4 E#'), '17/4')
    assert.equal(getValue('30.2\t12'), '30.2')
    assert.equal(getValue('-5. ! hello'), '-5.')
  })
  it('returns an empty string, when given string does not contain a cent or a ratio', () => {
    assert.equal(getValue('! comment'), '')
  })
})

describe('isFoundation', () => {
  it('returns true, when string contains value, which is either 1/1 ratio or 0.0 cent', () => {
    assert.equal(isFoundation('1/1 ! comment'), true)
    assert.equal(isFoundation('0.\tC'), true)
  })
  it('returns false, when string contains no value', () => {
    assert.equal(isFoundation('! comment'), false)
    assert.equal(isFoundation(''), false)
  })
  it('returns false, when value is non-zero cent or ratio other, than 1/1', () => {
    assert.equal(isFoundation('300.4'), false)
    assert.equal(isFoundation('3/2'), false)
  })
  it('returns false, when given ratio simplifies to 1/1, but individual numbers are bigger, than 1', () => {
    // TODO: is this the correct behavior?
    // "1/1 or 0.0 cents is implicit"
    assert.equal(isFoundation('3/3'), false)
  })
})

describe('hasAtLeastNElements', () => {
  it('returns true, when given number is less, than the length of the given array', () => {
    assert.equal(hasAtLeastNElements(1, [1, 2, 3]), true)
  })
  it('returns true, when given number matches the length of the given array', () => {
    assert.equal(hasAtLeastNElements(3, [1, 2, 3]), true)
  })
  it('returns false, when given number is less, than the length of the given array', () => {
    assert.equal(hasAtLeastNElements(7, [1, 2, 3]), false)
  })
})

describe('isValidScale', () => {
  it('returns false, when given text has less, than 2 non-comment lines', () => {
    const scl1 =
`This only has a single non-comment line`
    const scl2 =
` ! comments don't count
This only has a single non-comment line
! another comment
! and another`
    assert.equal(isValidScale(scl1), false)
    assert.equal(isValidScale(scl2), false)
  })
  it('returns false, when given text contains non human readable ASCII characters', () => {
    const scl =
`¯\_(ツ)_/¯
0`
    assert.equal(isValidScale(scl), false)
  })
  it('returns false, when description spreads to multiple lines', () => {
    const scl =
`This is the description,
which spreads to multiple lines, so
the number of notes is not on the 2nd non-comment line
0`
    assert.equal(isValidScale(scl), false)
  })
  it('returns false, when 2nd non-comment line is not purely a zero or positive integer', () => {
    const scl1 =
`Tuning name
2.9`
    const scl2 =
`Tuning name
2 ! This also has a comment`
    assert.equal(isValidScale(scl1), false)
    assert.equal(isValidScale(scl2), false)
  })
  it('returns false, when 2nd non comment line contains tabs', () => {
    // TODO: is this the correct behavior?
    // "Spaces before or after the number are allowed."
    const scl =
`Tuning name
\t0`
    assert.equal(isValidScale(scl), false)
  })
  it('returns false, when non-comment lines starting from the 3rd line are not all valid pitches', () => {
    const scl =
`Tuning name
2
3/2
2...`
    assert.equal(isValidScale(scl), false)
  })
  it('returns false, when number of non-comment lines after the 2nd don\'t match with the number written on the 2nd', () => {
    const scl =
`Tuning name
2
4/3
5/4
6/5
7/6`
    assert.equal(isValidScale(scl), false)
  })
  it('returns false, when given scale is okay, but ends with a newline', () => {
    const scl =
`Tuning name
2
300.
600.
`
    assert.equal(isValidScale(scl), false)
  })
  it('returns false, when given scale starts with a foundation pitch (1/1 or 0.0 cents)', () => {
    const scl =
`Tuning name
2
1/1
700.`
    assert.equal(isValidScale(scl), false)
  })

  // ---------

  it('returns true, when given scale contains a foundation pitch (1/1 or 0.0 cents) anywhere, but the first note', () => {
    // TODO: is this the correct behavior?
    // "The first note of 1/1 or 0.0 cents is implicit and not in the files."
    const scl =
`Tuning name
5
900.
400.
0.
-200.
-400.`
    assert.equal(isValidScale(scl), true)
  })
  it('returns true, when given scale contains 0 notes', () => {
    const scl1 =
`Tuning with 0 notes
0`
    const scl2 =
`! demo.scl
!
Tuning with 0 notes
! This is valid, since 1/1 or 0.0 is implicit
0`
    assert.equal(isValidScale(scl1), true)
    assert.equal(isValidScale(scl2), true)
  })
  it('returns true, when description is an empty line', () => {
    const scl1 =
`
0`
    const scl2 =
`! demo.scl
!

! No description here
0`
    assert.equal(isValidScale(scl1), true)
    assert.equal(isValidScale(scl2), true)
  })
  it('returns true, when number of notes has spaces around it', () => {
    const scl =
`Dummy tuning
      0   `
    assert.equal(isValidScale(scl), true)
  })
  it('returns true, when given scale has equal number of notes written after the 2nd line', () => {
    const scl =
`Dummy tuning
3
 6/5
 600.245
 1000.`
    assert.equal(isValidScale(scl), true)
  })
  it('returns true, when given notes have anything written after them, if separated by at least a space or a tab', () => {
    const scl =
`Dummy tuning
3
6/5 E\\
600.245\tF#
1000.     ! a comment`
    assert.equal(isValidScale(scl), true)
  })
})
