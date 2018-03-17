// http://www.sengpielaudio.com/calculator-centsratio.htm

import {
  compose,
  __
} from 'ramda'

import {
  multiply,
  log,
  pow,
  divide,
  findGreatestCommonDivisor,
  isInteger,
  dec,
  number
} from '../math/index'

import {
  octaveRatio
} from '../midi/constants'

import {
  Either
} from 'ramda-fantasy'

import Decimal from 'decimal.js'

// -----------------

// http://stackoverflow.com/a/10803250/1806628
const getRepeatingDecimal = fraction => {
  if (Either.isLeft(fraction)) {
    return fraction
  }

  var RePatternInRepeatDec = /(?:[^.]+\.\d*)(\d{2,})+(?:\1)$/
  var ReRepeatingNums = /^(\d+)(?:\1)$/
  var match = RePatternInRepeatDec.exec(fraction.value.toString())

  if (!match) {
    // Try again but take off last digit incase of precision error.
    match = RePatternInRepeatDec.exec(fraction.value.toString().replace(/\d$/, ''))
  }

  if (match && match.length > 1) {
    // Reset the match[1] if there is a pattern inside the matched pattern.
    match[1] = ReRepeatingNums.test(match[1]) ? ReRepeatingNums.exec(match[1])[1] : match[1]
  }

  return Either.Right(match ? match[1] : null)
}

const fractionToCents = compose(multiply(number(1200)), log(__, number(octaveRatio)))
const centsToFraction = compose(pow(octaveRatio), divide(__, 1200))

const ratioToFraction = divide
const fractionToRatio = fraction => {
  if (Either.isLeft(fraction)) {
    return fraction
  }
  if (isInteger(fraction).value) {
    return [fraction, number(1)]
  }

  // ---------------

  const capSize = Number.MAX_SAFE_INTEGER.toString().length
  const digitsLength = fraction.value.toString().replace('.', '').length
  const decimalLength = fraction.value.toString().split('.')[1].length

  if (digitsLength > capSize) {
    Decimal.set({ precision: decimalLength - (digitsLength - capSize) })
    fraction = multiply(fraction, 1)
    Decimal.set({ precision: 20 })
  }

  // ---------------

  const repetition = getRepeatingDecimal(fraction)
  let multiplier = (
    repetition.value !== null
      ? dec(pow(number(10), repetition.value.toString().length))
      : pow(number(10), fraction.value.toString().split('.')[1].length)
  )

  multiplier = divide(multiplier, findGreatestCommonDivisor(multiplier, multiply(multiplier, fraction)))

  return [multiply(fraction, multiplier), multiplier]
}

// -----------------

export {
  getRepeatingDecimal,
  fractionToCents,
  centsToFraction,
  ratioToFraction,
  fractionToRatio
}
