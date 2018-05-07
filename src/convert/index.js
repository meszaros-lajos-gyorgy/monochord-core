// http://www.sengpielaudio.com/calculator-centsratio.htm

import {
  multiply,
  log,
  pow,
  divide
} from '../math/index'

import {
  octaveRatio,
  centsPerOctave
} from '../midi/constants'

// -----------------

const fractionToCents = fraction => multiply(centsPerOctave, log(fraction, octaveRatio))
const centsToFraction = cents => pow(octaveRatio, divide(cents, centsPerOctave))

// -----------------

export {
  fractionToCents,
  centsToFraction
}
