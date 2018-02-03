import {
  wrapBinary,
  wrapUnary,
  number
} from './helpers'

import {
  Errors
} from './constants'

import {
  Either
} from 'ramda-fantasy'

import {
  always,
  tryCatch
} from 'ramda'

// -----------------

const add = wrapBinary(tryCatch(
  (a, b) => Either.Right(a.plus(b)),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const subtract = wrapBinary(tryCatch(
  (a, b) => Either.Right(a.minus(b)),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const multiply = wrapBinary(tryCatch(
  (a, b) => Either.Right(a.times(b)),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const divide = wrapBinary(tryCatch(
  (a, b) => Either.Right(a.div(b)),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const modulo = wrapBinary(tryCatch(
  (a, b) => Either.Right(a.mod(b)),
  always(Either.Left(Errors.DIVISION_BY_ZERO))
))

const floor = wrapUnary(tryCatch(
  a => Either.Right(a.floor()),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const ceil = wrapUnary(tryCatch(
  a => Either.Right(a.ceil()),
  always(Either.Left(Errors.INVALID_NUMBER))
))

/*
const sqrt = wrapUnary(tryCatch(
  a => a.sqrt(),
  e => {
    let err
    switch (e) {
      case 'No square root':
        err = Errors.NEGATIVE_ROOT
        break
      case 'Invalid decimal places':
        err = Errors.INVALID_DECIMAL_PLACES
        break
      case 'Invalid rounding mode':
        err = Errors.INVALID_ROUNDING_MODE
        break
    }
    return Either.Left(err)
  }
))
*/

const inc = add(1)
const dec = add(-1)
const negate = multiply(-1)

/*
const log = memoize(n => {
  return Math.log(n)
})

const pow = curryN(2, memoize((n, exp) => {
  // return Big(n).pow(exp)
  return Math.pow(n, exp)
}))

// root
// sqrt = 2nd root

const logN = curryN(2, memoize((base, n) => {
  return divide(log(n), log(base))
}))

const equals = curryN(2, memoize((a, b) => {
  return Big(a).eq(b)
}))

const lt = curryN(2, memoize((a, b) => {
  return Big(a).lt(b)
}))

const gt
const lte
const gte

const isZero
const isNegative
const isPositive

const isInteger
const isFraction
*/

// -----------------

export {
  number,

  add,
  subtract,
  multiply,
  divide,
  modulo,
  floor,
  ceil,
  inc,
  dec,
  negate

  /*
  log,
  pow,
  logN,

  equals,
  lt,
  gt,
  lte,
  gte,

  isZero,
  isNegative,
  isPositive,

  isInteger,
  isFraction
  */
}
