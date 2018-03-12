// http://www.sengpielaudio.com/calculator-centsratio.htm

/*
import {
  compose,
  memoize,
  __,
  adjust,
  concat,
  of,
  ifElse,
  converge,
  curry,
  defaultTo,
  find,
  flatten,
  map,
  unfold
  reduce,
  append,
  findIndex,
  head,
  tail,
  union,
  inc,
  identity,
  apply,
  repeat,
  zip,
  zipWith,
  min,
  max
} from 'ramda'

import {
  logN,
  multiply,
  add,
  divide,
  equals,
  lt,
  modulo,
  pow,
  sqrt,
  negate
} from '../math/index'

import {
  octaveRatio
} from '../midi/constants'

import {
  isZero
} from '../math/basic'
*/

// -----------------

/*
// http://stackoverflow.com/a/10803250/1806628
function getRepeatingDecimal (fraction) {
  fraction += ''
  var RePatternInRepeatDec = /(?:[^.]+\.\d*)(\d{2,})+(?:\1)$/
  var ReRepeatingNums = /^(\d+)(?:\1)$/
  var match = RePatternInRepeatDec.exec(fraction)

  if (!match) {
    // Try again but take off last digit incase of precision error.
    fraction = fraction.replace(/\d$/, '')
    match = RePatternInRepeatDec.exec(fraction)
  }

  if (match && match.length > 1) {
    // Reset the match[1] if there is a pattern inside the matched pattern.
    match[1] = ReRepeatingNums.test(match[1]) ? ReRepeatingNums.exec(match[1])[1] : match[1]
  }

  return match ? match[1] : null
}

const fractionToCents = memoize(compose(multiply(1200), logN(octaveRatio)))
const centsToFraction = memoize(compose(pow(octaveRatio), divide(__, 1200)))

const ratioToFraction = divide
const fractionToRatio = fraction => {
  if (Number.isInteger(fraction)) {
    return [fraction, 1]
  }

  var repetition = getRepeatingDecimal(fraction)
  var multiplier = (
    repetition !== null
    ? Math.pow(10, repetition.length) - 1
    : Math.pow(10, fraction.toString().split('.')[1].length)
  )

  multiplier /= findGreatestCommonDivisor([fraction * multiplier, multiplier])

  return [fraction * multiplier, multiplier]
}
*/

// -----------------

export {
  /*
  getRepeatingDecimal,
  fractionToCents,
  centsToFraction,
  ratioToFraction,
  fractionToRatio
  */
}
