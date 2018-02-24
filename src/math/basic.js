import {
  wrapBinary,
  wrapUnary,
  invert,
  ifThenElse
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
  curryN
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

const sqrt = wrapUnary(tryCatch(
  a => Either.Right(a.sqrt()),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const log = wrapBinary(tryCatch(
  (a, b) => Either.Right(a.log(b)),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const equals = wrapBinary(tryCatch(
  (a, b) => Either.Right(a.equals(b)),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const lt = wrapBinary(tryCatch(
  (a, b) => Either.Right(a.lt(b)),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const gt = wrapBinary(tryCatch(
  (a, b) => Either.Right(a.gt(b)),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const lte = wrapBinary(tryCatch(
  (a, b) => Either.Right(a.lte(b)),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const gte = wrapBinary(tryCatch(
  (a, b) => Either.Right(a.gte(b)),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const isZero = wrapUnary(tryCatch(
  a => Either.Right(a.isZero()),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const isNegative = wrapUnary(tryCatch(
  a => Either.Right(a.isNegative()),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const isPositive = wrapUnary(tryCatch(
  a => Either.Right(a.isPositive()),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const isInteger = wrapUnary(tryCatch(
  a => Either.Right(a.isInteger()),
  always(Either.Left(Errors.INVALID_NUMBER))
))

const isFraction = invert(isInteger)

const min = curryN(2, ifThenElse(lt, nthArg(0), nthArg(1)))
const max = curryN(2, ifThenElse(gt, nthArg(0), nthArg(1)))

// -----------------

export {
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

  log,

  equals,
  lt,
  gt,
  lte,
  gte,

  isZero,
  isNegative,
  isPositive,

  isInteger,
  isFraction,

  min,
  max
}
