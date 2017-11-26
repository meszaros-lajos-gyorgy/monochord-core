// http://www.sengpielaudio.com/calculator-centsratio.htm

import {
  compose,
  memoize,
  __
} from 'ramda'
import {
  logX,
  multiply,
  divide,
  pow
} from '../math/index'
import {
  octaveRatio
} from '../midi/constants'

const fractionToCents = memoize(compose(multiply(1200), logX(octaveRatio)))
const centsToFraction = memoize(compose(pow(octaveRatio), divide(__, 1200)))

const ratioToFraction = divide
const fractionToRatio = fraction => {
  /*
  if (Number.isInteger(fraction)) {
    return [fraction, 1]
  }

  var repetition = getRepeatingDecimal(fraction)
  var multiplier = (
    repetition !== null
    ? Math.pow(10, repetition.length) - 1
    : Math.pow(10, fraction.toString().split('.')[1].length)
  )

  multiplier /= greatestCommonDivisor(fraction * multiplier, multiplier)

  return [fraction * multiplier, multiplier]
  */
}

export {
  fractionToCents,
  centsToFraction,
  ratioToFraction,
  fractionToRatio
}
