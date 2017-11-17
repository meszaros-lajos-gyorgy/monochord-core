// http://www.huygens-fokker.org/scala/scl_format.html
// http://www.huygens-fokker.org/scala/help.htm#mappings

import {
  test,
  startsWith,
  split,
  compose,
  ifElse,
  replace,
  either,
  always,
  equals,
  reject,
  all,
  nth,
  both,
  allPass,
  converge,
  subtract,
  __,
  length,
  slice
} from 'ramda'

// The files are human readable ASCII or 8-bit character text-files.
const isHumanReadableAscii = test(/^[\x20-\x7E]*$/)

// There is one scale per file.

// Lines beginning with an exclamation mark are regarded as comments and are to be ignored.
const splitToLines = split(/\r?\n/g)
const isComment = startsWith('!')
const removeComments = reject(isComment)

// The first (non comment) line contains a short description of the scale, but long lines are possible and should not give a read error.
// The description is only one line.
// If there is no description, there should be an empty line.

// The second line contains the number of notes.
// This number indicates the number of lines with pitch values that follow.
// In principle there is no upper limit to this, but it is allowed to reject files exceeding a certain size.
// The lower limit is 0, which is possible since degree 0 of 1/1 is implicit.
// Spaces before or after the number are allowed.
const isValidNumberOfNotes = test(/^[ ]*\d+[ ]*$/)

// After that come the pitch values, each on a separate line, either as a ratio or as a value in cents.
// If the value contains a period, it is a cents value, otherwise a ratio.
const isCent = test(/^[\t ]*-?\d+\.\d*([ \t]+.*)?$/)
// Ratios are written with a slash, and only one.
const isRatio = test(/^[\t ]*\d+(\/\d+)?([ \t]+.*)?$/)
// Integer values with no period or slash should be regarded as such, for example "2" should be taken as "2/1".
// Numerators and denominators should be supported to at least (2^31)-1 = 2147483647.
// Anything after a valid pitch value should be ignored.
const isValidPitch = either(isCent, isRatio)
const ignoreAllAfterPitch = replace(/^([^ \t]+).*$/, '$1')
// Space or horizontal tab characters are allowed and should be ignored.
const ignoreLeadingWhitespace = replace(/^[ \t]*/, '')
// Negative ratios are meaningless and should give a read error.
// For a description of cents, go here(http://www.huygens-fokker.org/docs/measures.html#Ellis).

const getValue = ifElse(
  isValidPitch,
  compose(
    ignoreAllAfterPitch,
    ignoreLeadingWhitespace
  ),
  always('')
)

// The first note of 1/1 or 0.0 cents is implicit and not in the files.
const isFoundation = compose(
  either(equals('1/1'), test(/^0\.0?$/)),
  getValue
)

// Files for which Scala gives Error in file format are incorrectly formatted.
// They should give a read error and be rejected.

const isValidScalaFormat = compose(
  both(
    all(isHumanReadableAscii),
    compose(
      allPass([
        compose(isValidNumberOfNotes, nth(1)), // the 2nd line is a positive integer
        converge(equals, [ // 2nd line == number of notes
          compose(subtract(__, 2), length), // the number of lines after the 2nd line
          compose(parseInt, nth(1)) // the numeric value of the 2nd line
        ]),
        compose( // every note is valid
          all(isValidPitch),
          slice(2, Infinity) // remove 1st and 2nd lines to leave only the notes
        )
      ]),
      removeComments
    )
  ),
  splitToLines
)

export {
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
  isValidScalaFormat
}
