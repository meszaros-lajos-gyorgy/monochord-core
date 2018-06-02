// http://www.sengpielaudio.com/calculator-centsratio.htm

import {
  flip
} from 'ramda'

import {
  multiply,
  log,
  pow,
  divide,
  gt
} from '../math/index'

import {
  octaveRatio,
  centsPerOctave
} from '../midi/constants'

// -----------------

const fractionToCents = fraction => multiply(centsPerOctave, log(fraction, octaveRatio))
const centsToFraction = cents => pow(octaveRatio, divide(cents, centsPerOctave))
const ratioToFraction = (f1, f2) => (gt(f2, f1) ? flip(divide) : divide)(f1, f2)

// -----------------

export {
  fractionToCents,
  centsToFraction,
  ratioToFraction
}
