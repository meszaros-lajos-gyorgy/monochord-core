import Decimal from 'decimal.js'

import * as convert from './convert/index'
import * as math from './math/index'
import * as midi from './midi/index'
import * as scala from './scala/index'

// -----------------

const precision = 30

Decimal.set({
  precision: precision,
  toExpPos: precision + 1
})

// -----------------

export default {
  convert,
  math,
  midi,
  scala
}
