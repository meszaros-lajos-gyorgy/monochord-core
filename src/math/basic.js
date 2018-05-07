import {
  curry
} from 'ramda'

import Decimal from 'decimal.js'

// -----------------

const add = curry((a, b) => Decimal.add(a, b))

const subtract = curry((a, b) => Decimal.sub(a, b))

const multiply = curry((a, b) => Decimal.mul(a, b))

const divide = curry((a, b) => Decimal.div(a, b))

const modulo = curry((a, b) => Decimal.mod(a, b))

const pow = curry((a, b) => Decimal.pow(a, b))

const log = curry((a, b) => Decimal.log(a, b))

const floor = a => Decimal.floor(a)

const isZero = a => (new Decimal(a)).isZero()

// -----------------

export {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  pow,
  log,
  floor,
  isZero
}
