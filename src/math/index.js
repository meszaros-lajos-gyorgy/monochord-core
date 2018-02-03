import {
  wrapBinary,
  wrapUnary,
  number,
  invert
} from './helpers'

import {
  Errors
} from './constants'

import {
  Either
} from 'ramda-fantasy'

import {
  always,
  tryCatch,
  converge,
  nthArg,
  compose,
  __
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

const inc = add(1)
const dec = add(-1)
const negate = multiply(-1)

const pow = wrapBinary(tryCatch(
  (a, b) => Either.Right(a.pow(b)),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const root = converge(
  pow,
  [
    nthArg(0),
    compose(divide(1), nthArg(1))
  ]
)

const sqrt = root(__, 2)

/*
const log = memoize(n => {
  return Math.log(n)
})

const logN = curryN(2, memoize((base, n) => {
  return divide(log(n), log(base))
}))

// random?

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
*/

const isInteger = wrapUnary(tryCatch(
  a => Either.Right(a.isInteger()),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const isFraction = invert(isInteger)

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
  negate,

  pow,
  root,
  sqrt,

  /*
  log,
  logN,

  equals,
  lt,
  gt,
  lte,
  gte,

  isZero,
  isNegative,
  isPositive,
  */

  isInteger,
  isFraction
}
