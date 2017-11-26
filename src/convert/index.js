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

export {
  fractionToCents,
  centsToFraction
}
