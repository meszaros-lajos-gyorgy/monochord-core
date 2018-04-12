import {
  compose,
  converge,
  nthArg,
  curryN
} from 'ramda'

import {
  Either
} from 'ramda-fantasy'

import {
  ifThenElse
} from './helpers'

import {
  isZero,
  modulo,
  divide,
  multiply
} from './basic'

// -----------------

const checkArgument = (n, fn) => ifThenElse(
  compose(Either.Right, Either.isRight, nthArg(n)),
  fn,
  nthArg(n)
)

const findGreatestCommonDivisor = curryN(2, checkArgument(0, checkArgument(1, ifThenElse(
  compose(isZero, nthArg(1)),
  nthArg(0),
  (a, b) => findGreatestCommonDivisor(b, modulo(a, b))
))))

const findLeastCommonMultiple = curryN(2, checkArgument(0, checkArgument(1, converge(
  divide,
  [
    multiply,
    findGreatestCommonDivisor
  ]
))))

// -----------------

export {
  checkArgument,
  findGreatestCommonDivisor,
  findLeastCommonMultiple
}
